import datetime
import uuid

from sqlalchemy.orm import Session

from chalicelib.models import Room
from chalicelib.data.db import use_db_session


@use_db_session(commit=True)
def create_room(room_code: str, owner_user_id: int, db_session: Session) -> None:
    db_session.add(
        Room(
            room_guid=str(uuid.uuid4()),
            owner_user_id=owner_user_id,
            room_code=room_code,
            create_time=datetime.datetime.now(),
        )
    )
