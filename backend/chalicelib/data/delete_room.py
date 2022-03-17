from sqlalchemy.orm import session

from chalicelib.models import Room
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def delete_room(room_guid: str, db_session: session) -> None:
    db_session.query(Room).filter(Room.room_guid == room_guid).delete()
