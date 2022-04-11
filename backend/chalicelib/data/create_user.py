import datetime

from sqlalchemy.orm import Session

from chalicelib.models import User
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def create_user(user_username: str, db_session: Session) -> User:
    user = User(user_username=user_username, create_time=datetime.datetime.now())
    db_session.add(user)
    return user
