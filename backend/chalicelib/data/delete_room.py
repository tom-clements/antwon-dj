from sqlalchemy.orm import Session

from chalicelib.models import Room
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def delete_room(room_guid: str, db_session: Session) -> None:
    db_session.query(Room).filter(Room.room_guid == room_guid).delete()
