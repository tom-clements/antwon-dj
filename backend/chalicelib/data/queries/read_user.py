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
