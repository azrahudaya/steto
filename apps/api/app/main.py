from fastapi import FastAPI, Response, status
from redis import Redis
from sqlalchemy import text

from app.config import get_settings
from app.database import make_engine

app = FastAPI(title="Steto API", version="0.1.0", docs_url=None, redoc_url=None, openapi_url=None)


def get_database():
    engine = make_engine()
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    finally:
        engine.dispose()
    return True


def get_redis():
    return Redis.from_url(get_settings().redis_url, socket_connect_timeout=2, socket_timeout=2)


@app.get("/api/health")
def health(response: Response):
    db = "ok"
    redis = "ok"
    try:
        get_database()
    except Exception:
        db = "down"
    try:
        get_redis().ping()
    except Exception:
        redis = "down"
    if db != "ok" or redis != "ok":
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    return {
        "status": "ok" if db == redis == "ok" else "degraded",
        "db": db,
        "redis": redis,
        "model": "not_loaded",
    }
