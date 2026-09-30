# Steto

Dokter fokus ke pasien, Steto yang mencatat. https://steto.tech

Fondasi web dan API sedang dibangun. Fitur klinis berikut belum tersedia:

- Pendaftaran pasien dan kunjungan
- Perekaman dan transkripsi percakapan
- Draf SOAP dan saran ICD-10
- Persetujuan dokter dan bundle FHIR R4
- Adapter SATUSEHAT

Arsitektur: Next.js (web), FastAPI (api), RQ (worker), PostgreSQL, Redis, dan Caddy.

## Lokal

Salin `.env.example` ke `.env`, isi `POSTGRES_PASSWORD` dan kunci Clerk development milik aplikasi sendiri. Jangan commit `.env`. Jalankan `docker compose up --build`. Periksa `http://localhost` dan `/api/health`. Tanpa kunci Clerk, landing bisa dibuka, tetapi login belum aktif.

| Variabel | Kegunaan |
| --- | --- |
| `POSTGRES_PASSWORD` | Sandi PostgreSQL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Kunci publik Clerk, dibutuhkan saat build web |
| `CLERK_SECRET_KEY` | Kunci server Clerk |
| `DATABASE_URL` | Koneksi database API |
| `REDIS_URL` | Koneksi antrean |
| `DEEPSEEK_API_KEY` | Disiapkan untuk fitur AI, belum dipakai |
| `DEEPSEEK_BASE_URL`, `DEEPSEEK_MODEL` | Konfigurasi model, belum dipakai |
| `WHISPER_MODEL`, `WHISPER_COMPUTE_TYPE` | Konfigurasi STT, belum dipakai |
| `FHIR_TARGET`, `FHIR_BASE_URL` | Adapter FHIR, belum dipakai |
| `SATUSEHAT_ORG_ID`, `SATUSEHAT_CLIENT_ID`, `SATUSEHAT_CLIENT_SECRET` | Integrasi resmi, belum dipakai |

Rencana model: `Systran/faster-whisper-small` dari Hugging Face dan DeepSeek API. Daftar ICD-10 dari ICD-10-CM CDC akan ditambahkan bersama fitur klinis; belum ada `data/icd10.csv`.

Data simulasi saja, bukan alat diagnosis. Integrasi SATUSEHAT menunggu kredensial resmi.

Lisensi MIT.
