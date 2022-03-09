from typing import Union

from sqlalchemy.orm import session

from chalicelib.models import RoomSong, Room, User
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def get_room_song_id_from_room_song_guid(room_song_guid: str, db_session: session) -> Union[int, None]:
    return db_session.query(RoomSong.room_song_id).filter(RoomSong.room_song_guid == room_song_guid).scalar()


@use_db_session()
def get_user_id_from_username(username: str, db_session: session) -> Union[int, None]:
    return db_session.query(User.user_id).filter(User.user_username == username).scalar()


@use_db_session()
def get_room_guid_from_room_code(room_code: str, db_session: session) -> Union[str, None]:
    return db_session.query(Room.room_guid).filter(Room.room_code == room_code).scalar()


@use_db_session()
def get_room_id_from_room_guid(room_guid: str, db_session: session) -> Union[int, None]:
    return db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
