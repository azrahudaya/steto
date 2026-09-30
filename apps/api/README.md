# API Steto

Fondasi FastAPI Python 3.12. Saat ini hanya `/api/health` yang aktif. Endpoint klinis, autentikasi, rekaman, AI, dan FHIR belum diimplementasikan. Jangan gunakan data pasien asli.

- `DATABASE_URL` wajib diisi dengan URL SQLAlchemy PostgreSQL, misalnya `postgresql+psycopg://user:password@postgres:5432/steto` (contoh saja, bukan kredensial).
- `REDIS_URL` opsional, default `redis://localhost:6379/0`.
- `/api/health` menguji `SELECT 1` ke DB dan `PING` ke Redis; 200 bila keduanya sehat, 503 bila tidak. `model: not_loaded` menyatakan model AI belum dipasang. Endpoint ini tidak memerlukan token dan tidak mengeluarkan rincian error koneksi.
- Antrian RQ disiapkan oleh `app.queue.get_queue()`. Belum ada job; worker dapat dijalankan dengan `rq worker --url "$REDIS_URL"` setelah Redis tersedia.

Dari direktori `apps/api`, jalankan `python -m pytest -q`, atau `alembic upgrade head` setelah memasang `requirements-dev.txt` dan mengisi `DATABASE_URL`. Dockerfile memakai konteks root repositori, misalnya `docker build -f apps/api/Dockerfile -t steto-api .`.
