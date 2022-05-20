from sqlalchemy import String, cast
from sqlalchemy.orm import Session

from chalicelib.models import SpotifyUser, Room, User
from chalicelib.models.data_queries.room_info import SpotifyRoomInfo, RoomInfo
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_spotify_room_info(room_guid: str, db_session: Session) -> SpotifyRoomInfo:
    room_info = dict(
        db_session.query(Room.room_code, SpotifyUser.spotify_user_username)
        .select_from(Room)
        .join(User)
        .join(SpotifyUser)
        .filter(Room.room_guid == room_guid)
        .one()
    )
    return SpotifyRoomInfo(**room_info)


@use_db_session()
def read_room_info(room_guid: str, db_session: Session) -> RoomInfo:
    room_info = dict(
        db_session.query(
            Room.room_code,
            Room.room_guid,
            Room.is_inactive,
            cast(Room.create_time, String).label("create_time"),
            User.user_username,
        )
        .join(User)
        .filter(Room.room_guid == room_guid)
        .one()
    )
    return RoomInfo(**room_info)
