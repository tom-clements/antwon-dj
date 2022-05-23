from sqlalchemy.orm import Session

from chalicelib.models import SpotifyUser, Room
from chalicelib.models.data_queries.spotify_user_tokens import SpotifyUserTokens
from chalicelib.data.db import use_db_session


@use_db_session()
def read_spotify_user_tokens(room_guid: str, db_session: Session) -> SpotifyUserTokens:
    spotify_user_tokens = (
        db_session.query(
            SpotifyUser.spotify_user_id, SpotifyUser.spotify_access_token, SpotifyUser.spotify_refresh_token
        )
        .select_from(SpotifyUser)
        .join(Room, Room.owner_user_id == SpotifyUser.user_id)
        .filter(Room.room_guid == room_guid)
        .one()
    )
    return SpotifyUserTokens(**spotify_user_tokens)
