import datetime
import uuid
from typing import Dict, Any

from sqlalchemy.orm import Session

from chalicelib.models import SpotifyUser
from chalicelib.data.db import use_db_session


@use_db_session(commit=True)
def create_spotify_user(
    user_id: int, access_token: str, refresh_token: str, spotify_user: Dict[str, Any], db_session: Session
) -> None:
    db_session.add(
        SpotifyUser(
            spotify_user_guid=str(uuid.uuid4()),
            user_id=user_id,
            spotify_user_username=spotify_user["id"],
            spotify_user_name=spotify_user["display_name"],
            spotify_profile_image_url=spotify_user["images"][0]["url"],
            spotify_access_token=access_token,
            spotify_refresh_token=refresh_token,
            insert_time=datetime.datetime.now(),
        )
    )
