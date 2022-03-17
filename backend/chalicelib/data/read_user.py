from sqlalchemy.orm import session

from chalicelib.models import User
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_user(user_username: str, db_session: session):
    return db_session.query(User).filter(User.user_username == user_username).scalar()
