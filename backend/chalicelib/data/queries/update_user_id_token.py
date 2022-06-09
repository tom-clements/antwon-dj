from sqlalchemy.orm import Session

from chalicelib.data.db import use_db_session
from chalicelib.models import User


@use_db_session(commit=True)
def update_user_id_token(username: str, id_token: str, db_session: Session) -> None:
    db_session.query(User).filter(User.user_username == username).update(
        {"id_token": id_token},
        synchronize_session=False,
    )
