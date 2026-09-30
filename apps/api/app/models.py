from datetime import date, datetime
from uuid import uuid4

from sqlalchemy import (
    JSON, Boolean, CheckConstraint, Date, DateTime, ForeignKeyConstraint,
    Index, Integer, String, Text, UniqueConstraint, func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


def new_id() -> str:
    return str(uuid4())


class Tenant:
    org_id: Mapped[str] = mapped_column(String(128), nullable=False, index=True)


class Staff(Tenant, Base):
    __tablename__ = "staff"
    clerk_user_id: Mapped[str] = mapped_column(String(128), primary_key=True)
    nama: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    __table_args__ = (
        CheckConstraint("role IN ('admin','dokter','perawat','rekam_medis')", name="ck_staff_role"),
        UniqueConstraint("org_id", "email", name="uq_staff_org_email"),
        UniqueConstraint("org_id", "clerk_user_id", name="uq_staff_org_user"),
    )


class Patient(Tenant, Base):
    __tablename__ = "patients"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    nama: Mapped[str] = mapped_column(String(255), nullable=False)
    nik: Mapped[str] = mapped_column(String(16), nullable=False)
    tgl_lahir: Mapped[date] = mapped_column(Date, nullable=False)
    jk: Mapped[str] = mapped_column(String(20), nullable=False)
    __table_args__ = (
        CheckConstraint("jk IN ('L','P')", name="ck_patients_jk"),
        UniqueConstraint("org_id", "nik", name="uq_patients_org_nik"),
        UniqueConstraint("org_id", "id", name="uq_patients_org_id"),
    )


class Encounter(Tenant, Base):
    __tablename__ = "encounters"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    patient_id: Mapped[str] = mapped_column(String(36), nullable=False)
    dokter_id: Mapped[str | None] = mapped_column(String(128))
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="draft")
    mulai: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    selesai: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "patient_id"], ["patients.org_id", "patients.id"], name="fk_encounters_patient_tenant"),
        ForeignKeyConstraint(["org_id", "dokter_id"], ["staff.org_id", "staff.clerk_user_id"], name="fk_encounters_dokter_tenant"),
        CheckConstraint("status IN ('draft','recording','processing','review','approved','failed')", name="ck_encounters_status"),
        UniqueConstraint("org_id", "id", name="uq_encounters_org_id"),
        Index("ix_encounters_org_patient", "org_id", "patient_id"),
    )


class EncounterChild(Tenant):
    encounter_id: Mapped[str] = mapped_column(String(36), nullable=False)


class Consent(EncounterChild, Base):
    __tablename__ = "consents"
    encounter_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    pemberi: Mapped[str] = mapped_column(String(255), nullable=False)
    waktu: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    __table_args__ = (ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_consents_encounter_tenant"),)


class Vital(EncounterChild, Base):
    __tablename__ = "vitals"
    encounter_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    perawat_id: Mapped[str | None] = mapped_column(String(128))
    sistol: Mapped[int | None] = mapped_column(Integer)
    diastol: Mapped[int | None] = mapped_column(Integer)
    nadi: Mapped[int | None] = mapped_column(Integer)
    suhu: Mapped[float | None] = mapped_column()
    napas: Mapped[int | None] = mapped_column(Integer)
    berat: Mapped[float | None] = mapped_column()
    tinggi: Mapped[float | None] = mapped_column()
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_vitals_encounter_tenant"),
        ForeignKeyConstraint(["org_id", "perawat_id"], ["staff.org_id", "staff.clerk_user_id"], name="fk_vitals_perawat_tenant"),
    )


class AudioChunk(EncounterChild, Base):
    __tablename__ = "audio_chunks"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    seq: Mapped[int] = mapped_column(Integer, nullable=False)
    path: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_audio_chunks_encounter_tenant"),
        UniqueConstraint("encounter_id", "seq", name="uq_audio_chunks_encounter_seq"),
    )


class Segment(EncounterChild, Base):
    __tablename__ = "segments"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    seq: Mapped[int] = mapped_column(Integer, nullable=False)
    start_ms: Mapped[int] = mapped_column(Integer, nullable=False)
    end_ms: Mapped[int] = mapped_column(Integer, nullable=False)
    speaker: Mapped[str] = mapped_column(String(20), nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_segments_encounter_tenant"),
        UniqueConstraint("encounter_id", "seq", name="uq_segments_encounter_seq"),
        CheckConstraint("speaker IN ('dokter','pasien','tidak_jelas')", name="ck_segments_speaker"),
        CheckConstraint("start_ms >= 0 AND end_ms >= start_ms", name="ck_segments_times"),
    )


class SoapNote(EncounterChild, Base):
    __tablename__ = "soap_notes"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    version: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[dict] = mapped_column(JSON, nullable=False)
    source: Mapped[str] = mapped_column(String(10), nullable=False)
    approved_by: Mapped[str | None] = mapped_column(String(128))
    approved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_soap_notes_encounter_tenant"),
        ForeignKeyConstraint(["org_id", "approved_by"], ["staff.org_id", "staff.clerk_user_id"], name="fk_soap_notes_approver_tenant"),
        UniqueConstraint("encounter_id", "version", name="uq_soap_notes_encounter_version"),
        CheckConstraint("source IN ('ai','dokter')", name="ck_soap_notes_source"),
        CheckConstraint("version > 0", name="ck_soap_notes_version"),
    )


class Diagnosis(EncounterChild, Base):
    __tablename__ = "diagnoses"
    encounter_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    code: Mapped[str] = mapped_column(String(12), primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    source: Mapped[str] = mapped_column(String(10), nullable=False)
    rank: Mapped[int | None] = mapped_column(Integer)
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_diagnoses_encounter_tenant"),
        CheckConstraint("source IN ('ai','manual')", name="ck_diagnoses_source"),
    )


class FhirBundle(EncounterChild, Base):
    __tablename__ = "fhir_bundles"
    encounter_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    json: Mapped[dict] = mapped_column(JSON, nullable=False)
    valid: Mapped[bool] = mapped_column(Boolean, nullable=False)
    errors: Mapped[list] = mapped_column(JSON, nullable=False)
    target: Mapped[str] = mapped_column(String(20), nullable=False, default="none")
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    __table_args__ = (
        ForeignKeyConstraint(["org_id", "encounter_id"], ["encounters.org_id", "encounters.id"], name="fk_fhir_bundles_encounter_tenant"),
        CheckConstraint("target IN ('none','hapi','satusehat')", name="ck_fhir_bundles_target"),
    )


class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    org_id: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    clerk_user_id: Mapped[str] = mapped_column(String(128), nullable=False)
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    entity: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_id: Mapped[str] = mapped_column(String(128), nullable=False)
    at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    __table_args__ = (Index("ix_audit_logs_org_at", "org_id", "at"),)
