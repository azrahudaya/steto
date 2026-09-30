import os
import subprocess
import sys

import pytest
from sqlalchemy import create_engine, event, inspect
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.config import Settings
from app.database import Base
from app.models import Encounter, Patient, Staff
from app.queue import get_queue


def test_settings_require_database_url(monkeypatch):
    monkeypatch.delenv("DATABASE_URL", raising=False)
    with pytest.raises(Exception):
        Settings(_env_file=None)


def test_queue_uses_configured_redis_without_connecting(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "sqlite://")
    monkeypatch.setenv("REDIS_URL", "redis://example.invalid:6379/5")
    from app.config import get_settings
    get_settings.cache_clear()
    try:
        queue = get_queue()
        assert queue.name == "default"
        assert queue.connection.connection_pool.connection_kwargs["db"] == 5
    finally:
        get_settings.cache_clear()


def test_migration_round_trip_matches_models(tmp_path):
    path = tmp_path / "migration.sqlite"
    env = {**os.environ, "DATABASE_URL": f"sqlite:///{path}"}
    cwd = str(__import__("pathlib").Path(__file__).resolve().parents[1])
    subprocess.run([sys.executable, "-m", "alembic", "upgrade", "head"], cwd=cwd, env=env, check=True, capture_output=True)
    engine = create_engine(f"sqlite:///{path}")
    assert set(inspect(engine).get_table_names()) == set(Base.metadata.tables) | {"alembic_version"}
    subprocess.run([sys.executable, "-m", "alembic", "downgrade", "base"], cwd=cwd, env=env, check=True, capture_output=True)
    assert set(inspect(engine).get_table_names()) == {"alembic_version"}
    engine.dispose()


def test_encounter_cannot_reference_patient_from_another_org(tmp_path):
    engine = create_engine(f"sqlite:///{tmp_path / 'tenant.sqlite'}")

    @event.listens_for(engine, "connect")
    def enable_foreign_keys(connection, record):
        connection.execute("PRAGMA foreign_keys=ON")

    Base.metadata.create_all(engine)
    with Session(engine) as session:
        session.add(Patient(id="pat_1", org_id="org_a", nama="Uji", nik="9999000000000001", tgl_lahir=__import__("datetime").date(1990, 1, 1), jk="P"))
        session.commit()
        session.add(Encounter(id="enc_1", org_id="org_b", patient_id="pat_1", status="draft"))
        with pytest.raises(IntegrityError):
            session.commit()
    engine.dispose()
