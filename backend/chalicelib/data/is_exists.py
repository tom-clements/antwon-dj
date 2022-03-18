from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import session

from chalicelib.models import User, SpotifyUser, RoomSongLike, Room
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def is_like_exists(room_song_id: int, user_id: int, db_session: session) -> bool:
    try:
        db_session.query(RoomSongLike).filter(
            RoomSongLike.room_song_id == room_song_id, RoomSongLike.user_id == user_id
        ).one()
        return True
    except NoResultFound:
        return False


@use_db_session(commit=True)
def is_spotify_user_exists(user_id: int, db_session: session) -> bool:
    try:
        db_session.query(SpotifyUser).filter(SpotifyUser.user_id == user_id).one()
        return True
    except NoResultFound:
        return False


@use_db_session(commit=True)
def is_username_exist(user_username: str, db_session: session) -> bool:
    return bool(db_session.query(User).filter(User.user == user_username).scalar())


@use_db_session(commit=True)
def is_room_exists(room_guid: str, db_session: session) -> bool:
    try:
        db_session.query(Room).filter(Room.room_guid == room_guid).one()
        return True
    except NoResultFound:
        return False