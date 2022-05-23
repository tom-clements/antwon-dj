from functools import wraps
from typing import Tuple, Callable, Any, Dict

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker, Session

from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval
from chalicelib.utils.env import ENVIRONMENT


def create_db_engine(db_conn_string: str, debug_mode: bool = False) -> Engine:
    return create_engine(
        db_conn_string,
        echo=debug_mode,
        pool_size=1,
        max_overflow=0,
        pool_recycle=60,
        pool_pre_ping=True,
        pool_use_lifo=True,
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
    return Session(), engine


def get_local_db_session() -> Tuple[Session, Engine]:
    db_conn_string = "sqlite:///chalicelib/data/local/local.db"
    engine = create_engine(db_conn_string, echo=True)
    Session = sessionmaker(bind=engine)
    return Session(), engine


def use_db_session(
    database: str = "antwon", commit: bool = False, rollback: bool = False, close: bool = True
) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: Any, **kwargs: Dict[str, Any]) -> Any:
            if "db_session" not in kwargs:
                if ENVIRONMENT == "local":
                    db_session, engine = get_local_db_session()
                else:
                    db_session, engine = get_db_session(database=database)
                kwargs["db_session"] = db_session  # type: ignore
                try:
                    res = f(*args, **kwargs)
                    if commit:
                        db_session.commit()
                    if rollback:
                        db_session.rollback()
                    if close:
                        db_session.close()
                        engine.dispose()
                except Exception:
                    db_session.close()
                    engine.dispose()
                    raise
            else:
                res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator
