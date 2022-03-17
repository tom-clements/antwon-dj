from sqlalchemy.orm import session
from sqlalchemy.util import namedtuple

from chalicelib.models import SpotifyUser, Room, User
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_room_info(room_guid: str, db_session: session) -> namedtuple:
    return (
        db_session.query(Room.room_code, SpotifyUser.spotify_user_username)
        .select_from(Room)
        .join(User)
        .join(SpotifyUser)
        .filter(Room.room_guid == room_guid)
        .one()
    )
