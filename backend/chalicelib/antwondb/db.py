from functools import wraps

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from chalicelib.utils.secrets import AwsSecretRetrieval


def create_db_engine(db_conn_string, debug_mode=False):
    return create_engine(
        db_conn_string,
        echo=debug_mode,
        pool_size=1,
        max_overflow=0,
        pool_recycle=3600,
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
def get_db_session(username, password, host, port) -> Session:
    db_conn_string = f"mysql+pymysql://{username}:{password}@{host}:{port}/antwon"
    engine = create_db_engine(db_conn_string)
    Session = sessionmaker(bind=engine)
    # todo: setup connection pooling properties
    return Session()


def use_db_session(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        db_session = get_db_session()
        res = f(db_session, *args, **kwargs)
        db_session.close()
        return res

    return decorated
