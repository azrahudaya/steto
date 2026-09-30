from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings


class Base(DeclarativeBase):
    pass


def make_engine():
    return create_engine(get_settings().database_url, pool_pre_ping=True)
