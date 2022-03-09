from sqlalchemy.orm import session

from chalicelib.models import SpotifyUser, Room
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_spotify_user(room_guid: str, db_session: session):
    return (
        db_session.query(
            SpotifyUser.spotify_user_id, SpotifyUser.spotify_access_token, SpotifyUser.spotify_refresh_token
        )
        .select_from(SpotifyUser)
        .join(Room, Room.owner_user_id == SpotifyUser.user_id)
        .filter(Room.room_guid == room_guid)
        .one()
    )
