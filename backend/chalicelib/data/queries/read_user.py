from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound

from chalicelib.data.error_handling import UserNotFoundDbError
from chalicelib.models import User
from chalicelib.data.db import use_db_session


@use_db_session()
def read_user(user_username: str, db_session: Session) -> User:
    try:
        return db_session.query(User).filter(User.user_username == user_username).one()
    except NoResultFound:
        raise UserNotFoundDbError(user_username)


@use_db_session()
def read_user_id_token(user_username: str, db_session: Session) -> str:
    id_token = db_session.query(User.id_token).filter(User.user_username == user_username).scalar()
    if not id_token:
        raise UserNotFoundDbError(user_username)
    return id_token
