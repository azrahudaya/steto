"""initial_schema"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'ffe96d0e467e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('audit_logs',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.Column('clerk_user_id', sa.String(length=128), nullable=False),
    sa.Column('action', sa.String(length=100), nullable=False),
    sa.Column('entity', sa.String(length=100), nullable=False),
    sa.Column('entity_id', sa.String(length=128), nullable=False),
    sa.Column('at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_audit_logs_org_at', 'audit_logs', ['org_id', 'at'], unique=False)
    op.create_index(op.f('ix_audit_logs_org_id'), 'audit_logs', ['org_id'], unique=False)
    op.create_table('patients',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('nama', sa.String(length=255), nullable=False),
    sa.Column('nik', sa.String(length=16), nullable=False),
    sa.Column('tgl_lahir', sa.Date(), nullable=False),
    sa.Column('jk', sa.String(length=20), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("jk IN ('L','P')", name='ck_patients_jk'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('org_id', 'id', name='uq_patients_org_id'),
    sa.UniqueConstraint('org_id', 'nik', name='uq_patients_org_nik')
    )
    op.create_index(op.f('ix_patients_org_id'), 'patients', ['org_id'], unique=False)
    op.create_table('staff',
    sa.Column('clerk_user_id', sa.String(length=128), nullable=False),
    sa.Column('nama', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("role IN ('admin','dokter','perawat','rekam_medis')", name='ck_staff_role'),
    sa.PrimaryKeyConstraint('clerk_user_id'),
    sa.UniqueConstraint('org_id', 'clerk_user_id', name='uq_staff_org_user'),
    sa.UniqueConstraint('org_id', 'email', name='uq_staff_org_email')
    )
    op.create_index(op.f('ix_staff_org_id'), 'staff', ['org_id'], unique=False)
    op.create_table('encounters',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('patient_id', sa.String(length=36), nullable=False),
    sa.Column('dokter_id', sa.String(length=128), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('mulai', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('selesai', sa.DateTime(timezone=True), nullable=True),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("status IN ('draft','recording','processing','review','approved','failed')", name='ck_encounters_status'),
    sa.ForeignKeyConstraint(['org_id', 'dokter_id'], ['staff.org_id', 'staff.clerk_user_id'], name='fk_encounters_dokter_tenant'),
    sa.ForeignKeyConstraint(['org_id', 'patient_id'], ['patients.org_id', 'patients.id'], name='fk_encounters_patient_tenant'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('org_id', 'id', name='uq_encounters_org_id')
    )
    op.create_index(op.f('ix_encounters_org_id'), 'encounters', ['org_id'], unique=False)
    op.create_index('ix_encounters_org_patient', 'encounters', ['org_id', 'patient_id'], unique=False)
    op.create_table('audio_chunks',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('seq', sa.Integer(), nullable=False),
    sa.Column('path', sa.Text(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_audio_chunks_encounter_tenant'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('encounter_id', 'seq', name='uq_audio_chunks_encounter_seq')
    )
    op.create_index(op.f('ix_audio_chunks_org_id'), 'audio_chunks', ['org_id'], unique=False)
    op.create_table('consents',
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('pemberi', sa.String(length=255), nullable=False),
    sa.Column('waktu', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_consents_encounter_tenant'),
    sa.PrimaryKeyConstraint('encounter_id')
    )
    op.create_index(op.f('ix_consents_org_id'), 'consents', ['org_id'], unique=False)
    op.create_table('diagnoses',
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('code', sa.String(length=12), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('source', sa.String(length=10), nullable=False),
    sa.Column('rank', sa.Integer(), nullable=True),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("source IN ('ai','manual')", name='ck_diagnoses_source'),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_diagnoses_encounter_tenant'),
    sa.PrimaryKeyConstraint('encounter_id', 'code')
    )
    op.create_index(op.f('ix_diagnoses_org_id'), 'diagnoses', ['org_id'], unique=False)
    op.create_table('fhir_bundles',
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('json', sa.JSON(), nullable=False),
    sa.Column('valid', sa.Boolean(), nullable=False),
    sa.Column('errors', sa.JSON(), nullable=False),
    sa.Column('target', sa.String(length=20), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("target IN ('none','hapi','satusehat')", name='ck_fhir_bundles_target'),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_fhir_bundles_encounter_tenant'),
    sa.PrimaryKeyConstraint('encounter_id')
    )
    op.create_index(op.f('ix_fhir_bundles_org_id'), 'fhir_bundles', ['org_id'], unique=False)
    op.create_table('segments',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('seq', sa.Integer(), nullable=False),
    sa.Column('start_ms', sa.Integer(), nullable=False),
    sa.Column('end_ms', sa.Integer(), nullable=False),
    sa.Column('speaker', sa.String(length=20), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("speaker IN ('dokter','pasien','tidak_jelas')", name='ck_segments_speaker'),
    sa.CheckConstraint('start_ms >= 0 AND end_ms >= start_ms', name='ck_segments_times'),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_segments_encounter_tenant'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('encounter_id', 'seq', name='uq_segments_encounter_seq')
    )
    op.create_index(op.f('ix_segments_org_id'), 'segments', ['org_id'], unique=False)
    op.create_table('soap_notes',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('content', sa.JSON(), nullable=False),
    sa.Column('source', sa.String(length=10), nullable=False),
    sa.Column('approved_by', sa.String(length=128), nullable=True),
    sa.Column('approved_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.CheckConstraint("source IN ('ai','dokter')", name='ck_soap_notes_source'),
    sa.CheckConstraint('version > 0', name='ck_soap_notes_version'),
    sa.ForeignKeyConstraint(['org_id', 'approved_by'], ['staff.org_id', 'staff.clerk_user_id'], name='fk_soap_notes_approver_tenant'),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_soap_notes_encounter_tenant'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('encounter_id', 'version', name='uq_soap_notes_encounter_version')
    )
    op.create_index(op.f('ix_soap_notes_org_id'), 'soap_notes', ['org_id'], unique=False)
    op.create_table('vitals',
    sa.Column('encounter_id', sa.String(length=36), nullable=False),
    sa.Column('perawat_id', sa.String(length=128), nullable=True),
    sa.Column('sistol', sa.Integer(), nullable=True),
    sa.Column('diastol', sa.Integer(), nullable=True),
    sa.Column('nadi', sa.Integer(), nullable=True),
    sa.Column('suhu', sa.Double(), nullable=True),
    sa.Column('napas', sa.Integer(), nullable=True),
    sa.Column('berat', sa.Double(), nullable=True),
    sa.Column('tinggi', sa.Double(), nullable=True),
    sa.Column('org_id', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['org_id', 'encounter_id'], ['encounters.org_id', 'encounters.id'], name='fk_vitals_encounter_tenant'),
    sa.ForeignKeyConstraint(['org_id', 'perawat_id'], ['staff.org_id', 'staff.clerk_user_id'], name='fk_vitals_perawat_tenant'),
    sa.PrimaryKeyConstraint('encounter_id')
    )
    op.create_index(op.f('ix_vitals_org_id'), 'vitals', ['org_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_vitals_org_id'), table_name='vitals')
    op.drop_table('vitals')
    op.drop_index(op.f('ix_soap_notes_org_id'), table_name='soap_notes')
    op.drop_table('soap_notes')
    op.drop_index(op.f('ix_segments_org_id'), table_name='segments')
    op.drop_table('segments')
    op.drop_index(op.f('ix_fhir_bundles_org_id'), table_name='fhir_bundles')
    op.drop_table('fhir_bundles')
    op.drop_index(op.f('ix_diagnoses_org_id'), table_name='diagnoses')
    op.drop_table('diagnoses')
    op.drop_index(op.f('ix_consents_org_id'), table_name='consents')
    op.drop_table('consents')
    op.drop_index(op.f('ix_audio_chunks_org_id'), table_name='audio_chunks')
    op.drop_table('audio_chunks')
    op.drop_index('ix_encounters_org_patient', table_name='encounters')
    op.drop_index(op.f('ix_encounters_org_id'), table_name='encounters')
    op.drop_table('encounters')
    op.drop_index(op.f('ix_staff_org_id'), table_name='staff')
    op.drop_table('staff')
    op.drop_index(op.f('ix_patients_org_id'), table_name='patients')
    op.drop_table('patients')
    op.drop_index(op.f('ix_audit_logs_org_id'), table_name='audit_logs')
    op.drop_index('ix_audit_logs_org_at', table_name='audit_logs')
    op.drop_table('audit_logs')
