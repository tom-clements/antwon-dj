from typing import Union

from sqlalchemy.orm import session

from chalicelib.models import Room, Song, User
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def get_song_from_song_uri(song_uri: str, db_session: session) -> Union[Song, None]:
    return db_session.query(Song).filter(Song.song_uri == song_uri).one()


@use_db_session(commit=True)
def get_room_owner(room_guid: str, db_session: session):
    return db_session.query(User.user_username).join(Room).filter(Room.room_guid == room_guid).one()
