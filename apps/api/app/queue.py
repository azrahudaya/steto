from redis import Redis
from rq import Queue

from app.config import get_settings


def get_queue(name: str = "default") -> Queue:
    return Queue(name, connection=Redis.from_url(get_settings().redis_url))
