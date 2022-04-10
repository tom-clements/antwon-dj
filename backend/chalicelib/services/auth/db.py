from functools import wraps
from typing import Tuple

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker, Session

from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval


def create_db_engine(db_conn_string, debug_mode=False):
    return create_engine(
        db_conn_string,
        echo=debug_mode,
        pool_size=1,
        max_overflow=0,
        pool_recycle=60,
        pool_pre_ping=True,
        pool_use_lifo=True,
        # poolclass=NullPool
    )


@AwsSecretRetrieval(
    "antwon-rds-credentials",
    username="username",
    password="password",
    host="host",
    port="port",
)
def get_db_session(
    username: str, password: str, host: str, port: str, database: str = "antwon"
) -> Tuple[Session, Engine]:
    db_conn_string = f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"
    engine = create_db_engine(db_conn_string)
    Session = sessionmaker(bind=engine)
    # todo: setup connection pooling properties
    return Session(), engine


def use_db_session(database="antwon", commit=False, rollback=False, close=True):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if "db_session" not in kwargs:
                db_session, engine = get_db_session(database=database)
                kwargs["db_session"] = db_session
                try:
                    res = f(*args, **kwargs)
                    if commit:
                        db_session.commit()
                    if rollback:
                        db_session.rollback()
                    if close:
                        db_session.close()
                        engine.dispose()
                except:  # noqa: E722
                    db_session.close()
                    engine.dispose()
                    raise
            else:
                res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator
