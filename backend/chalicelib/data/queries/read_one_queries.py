from typing import Optional

from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm import Session

from chalicelib.data.error_handling import SongNotFoundDbError
from chalicelib.models import Room, Song, User
from chalicelib.data.db import use_db_session


@use_db_session()
def get_song_from_song_uri(song_uri: str, db_session: Session) -> Optional[Song]:
    try:
        return db_session.query(Song).filter(Song.song_uri == song_uri).one()
    except NoResultFound:
        raise SongNotFoundDbError(song_uri)


@use_db_session(commit=True)
def get_room_owner(room_guid: str, db_session: Session) -> str:
    return db_session.query(User.user_username).join(Room).filter(Room.room_guid == room_guid).scalar()
