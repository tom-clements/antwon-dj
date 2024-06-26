import datetime

from sqlalchemy.orm import Session

from chalicelib.models import User
from chalicelib.data.db import use_db_session


@use_db_session(commit=True)
def create_user(user_username: str, id_token: str, db_session: Session) -> User:
    user = User(user_username=user_username, id_token=id_token, create_time=datetime.datetime.now())
    db_session.add(user)
    return user
