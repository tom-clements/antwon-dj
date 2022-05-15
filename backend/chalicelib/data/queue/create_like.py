import uuid

from sqlalchemy.orm import Session

from chalicelib.models import RoomSongLike
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def create_like(room_song_id: int, user_id: int, db_session: Session) -> None:
    db_session.add(
        RoomSongLike(room_song_like_guid=str(uuid.uuid4()), room_song_id=room_song_id, user_id=user_id, like_value=1)
    )
