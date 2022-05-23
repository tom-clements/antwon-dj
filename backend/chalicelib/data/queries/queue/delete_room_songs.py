from sqlalchemy.orm import Session

from chalicelib.models import RoomSong, Room
from chalicelib.data.db import use_db_session


@use_db_session(commit=True)
def delete_room_songs(room_guid: str, db_session: Session) -> None:
    db_session.query(RoomSong).join(Room).filter(Room.room_guid == room_guid).delete()
