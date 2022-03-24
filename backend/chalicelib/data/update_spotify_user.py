import datetime

from sqlalchemy.orm import session

from chalicelib.models import SpotifyUser
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def update_spotify_user(user_id: int, access_token: str, refresh_token: str, db_session: session) -> None:
    """
    Will be deprecated soon
    """
    db_session.query(SpotifyUser).filter(SpotifyUser.user_id == user_id).update(
        {
            SpotifyUser.spotify_access_token: access_token,
            SpotifyUser.spotify_refresh_token: refresh_token,
            SpotifyUser.insert_time: datetime.datetime.now(),
        },
        synchronize_session=False,
    )
