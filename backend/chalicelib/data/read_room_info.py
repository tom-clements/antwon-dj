from dacite import from_dict
from sqlalchemy.orm import Session

from chalicelib.models import SpotifyUser, Room, User
from chalicelib.models.data_queries.room_info import RoomInfo
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_room_info(room_guid: str, db_session: Session) -> RoomInfo:
    room_info = dict(
        db_session.query(Room.room_code, SpotifyUser.spotify_user_username)
        .select_from(Room)
        .join(User)
        .join(SpotifyUser)
        .filter(Room.room_guid == room_guid)
        .one()
    )
    return from_dict(data_class=RoomInfo, data=room_info)
