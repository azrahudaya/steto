from pathlib import Path
from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, inspect, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.database import Base
from app.main import app
import app.main as main
from app.models import (
    AudioChunk,
    AuditLog,
    Consent,
    Diagnosis,
    Encounter,
    FhirBundle,
    Patient,
    Segment,
    SoapNote,
    Staff,
    Vital,
)


@pytest.fixture
def engine():
    engine = create_engine(
        "sqlite+pysqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    yield engine
    engine.dispose()


def test_schema_contains_each_planned_table_and_tenant_column(engine):
    tables = set(inspect(engine).get_table_names())
    assert tables == {
        "staff", "patients", "encounters", "consents", "vitals",
        "audio_chunks", "segments", "soap_notes", "diagnoses",
        "fhir_bundles", "audit_logs",
    }
    for table in tables:
        assert "org_id" in {column["name"] for column in inspect(engine).get_columns(table)}


def test_required_fields_and_references_are_enforced(engine):
    with Session(engine) as session:
        session.add(Staff(clerk_user_id="user_1", org_id="org_1", nama="Dokter", email="d@example.test", role="dokter"))
        session.add(Patient(id="pat_1", org_id="org_1", nama="Uji", nik="9999000000000001", tgl_lahir=date(1990, 1, 1), jk="P"))
        session.commit()
        session.add(Encounter(id="enc_1", org_id="org_1", patient_id="pat_1", dokter_id="user_1", status="draft"))
        session.commit()
        assert session.scalar(select(Encounter).where(Encounter.org_id == "org_1")).id == "enc_1"
        session.add(Consent(encounter_id="enc_1", org_id="org_1", pemberi="Pasien"))
        session.add(Vital(encounter_id="enc_1", org_id="org_1", perawat_id="user_1", sistol=120))
        session.add(AudioChunk(encounter_id="enc_1", org_id="org_1", seq=0, path="/tmp/a.webm", status="pending"))
        session.add(Segment(encounter_id="enc_1", org_id="org_1", seq=0, start_ms=0, end_ms=1000, speaker="dokter", text="Halo"))
        session.add(SoapNote(encounter_id="enc_1", org_id="org_1", version=1, content={"S": []}, source="ai"))
        session.add(Diagnosis(encounter_id="enc_1", org_id="org_1", code="J06.9", title="ISPA", source="ai", rank=1))
        session.add(FhirBundle(encounter_id="enc_1", org_id="org_1", json={"resourceType": "Bundle"}, valid=True, errors=[], target="none", status="ready"))
        session.add(AuditLog(org_id="org_1", clerk_user_id="user_1", action="create", entity="patient", entity_id="pat_1"))
        session.commit()
        assert session.scalar(select(SoapNote)).content == {"S": []}
        assert session.scalar(select(FhirBundle)).errors == []


@pytest.mark.parametrize("model, values", [
    (Staff, {"clerk_user_id": "u", "nama": "N", "email": "x", "role": "other"}),
    (Encounter, {"id": "e", "patient_id": "p", "status": "other"}),
    (Segment, {"encounter_id": "e", "seq": 0, "start_ms": 0, "end_ms": 1, "speaker": "other", "text": "x"}),
])
def test_invalid_enumerated_values_rejected(engine, model, values):
    with Session(engine) as session:
        session.add(model(org_id="org_1", **values))
        with pytest.raises(IntegrityError):
            session.commit()


def test_health_reports_dependencies_and_model_without_loading_it(monkeypatch):
    class RedisOK:
        def ping(self):
            return True

    monkeypatch.setattr(main, "get_database", lambda: object())
    monkeypatch.setattr(main, "get_redis", lambda: RedisOK())
    with TestClient(app) as client:
        response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "db": "ok", "redis": "ok", "model": "not_loaded"}


def test_health_reports_failure_without_leaking_error_details(monkeypatch):
    class RedisDown:
        def ping(self):
            raise RuntimeError("private connection address")

    monkeypatch.setattr(main, "get_database", lambda: object())
    monkeypatch.setattr(main, "get_redis", lambda: RedisDown())
    with TestClient(app) as client:
        response = client.get("/api/health")
    assert response.status_code == 503
    assert response.json() == {"status": "degraded", "db": "ok", "redis": "down", "model": "not_loaded"}
    assert "private connection address" not in response.text


def test_health_database_failure_is_degraded(monkeypatch):
    def broken_db():
        raise RuntimeError("private database address")

    class RedisOK:
        def ping(self):
            return True

    monkeypatch.setattr(main, "get_database", broken_db)
    monkeypatch.setattr(main, "get_redis", lambda: RedisOK())
    with TestClient(app) as client:
        response = client.get("/api/health")
    assert response.status_code == 503
    assert response.json()["db"] == "down"
    assert "private database address" not in response.text


def test_migration_is_present():
    migrations = list((Path(__file__).resolve().parents[1] / "alembic" / "versions").glob("*.py"))
    assert migrations
