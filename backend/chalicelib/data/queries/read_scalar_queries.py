from typing import Optional

from sqlalchemy.orm import Session

from chalicelib.models import RoomSong, Room, User
from chalicelib.data.db import use_db_session


@use_db_session()
def read_room_song_id_from_room_song_guid(room_song_guid: str, db_session: Session) -> Optional[int]:
    return db_session.query(RoomSong.room_song_id).filter(RoomSong.room_song_guid == room_song_guid).scalar()


@use_db_session()
def read_user_id_from_username(username: str, db_session: Session) -> Optional[int]:
    return db_session.query(User.user_id).filter(User.user_username == username).scalar()


@use_db_session()
def read_room_guid_from_username(username: str, db_session: Session) -> Optional[int]:
    return db_session.query(Room.room_guid).join(User).filter(User.user_username == username).scalar()


@use_db_session()
def read_room_code_from_username(username: str, db_session: Session) -> Optional[str]:
    return (
        db_session.query(Room.room_code)
        .join(User)
        .filter(User.user_username == username, Room.is_inactive.is_(False))
        .scalar()
    )


@use_db_session()
def read_room_guid_from_room_code(room_code: str, db_session: Session) -> Optional[str]:
    return db_session.query(Room.room_guid).filter(Room.room_code == room_code).scalar()


@use_db_session()
def read_room_id_from_room_guid(room_guid: str, db_session: Session) -> Optional[int]:
    return db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
