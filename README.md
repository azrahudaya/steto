# Steto

Dokter fokus ke pasien, Steto yang mencatat.

Steto adalah aplikasi dokumentasi medis untuk Puskesmas yang menggunakan AI untuk mentranskrip percakapan konsultasi dan menghasilkan draf SOAP secara otomatis.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Fitur

- **Transkripsi Medis** — AI yang memahami terminologi medis Indonesia
- **Draf SOAP Otomatis** — Subjektif, Objektif, Assessment, Plan dalam hitungan detik
- **Saran ICD-10** — Rekomendasi kode diagnosis berdasarkan percakapan
- **Integrasi SATUSEHAT** — Kirim ke Kemenkes dengan format FHIR standar
- **Multi-Tenancy** — Satu aplikasi untuk seluruh Puskesmas di Indonesia

## Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Redis, RQ
- **Auth**: Clerk dengan organisasi multi-tenant
- **Infra**: Docker, Caddy reverse proxy

## Quick Start

```bash
# Clone repository
git clone https://github.com/azrahudaya/steto.git
cd steto

# Copy environment
cp .env.example .env

# Start with Docker
docker compose up -d

# Open http://localhost:3100
```

## Development

```bash
# Web (Next.js)
cd apps/web
npm install
npm run dev

# API (FastAPI)
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

See `.env.example` for required variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key
- `CLERK_SECRET_KEY` — Clerk secret key
- `DATABASE_URL` — PostgreSQL connection
- `REDIS_URL` — Redis connection

## License

MIT License — see [LICENSE](LICENSE)

---

Built by [azrahudaya](https://github.com/azrahudaya)
