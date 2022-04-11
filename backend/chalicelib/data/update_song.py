from typing import Dict, Any

from sqlalchemy.orm import Session

from chalicelib.models import Song
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def update_song(update_data: Dict[str, Any], db_session: Session) -> None:
    db_session.query(Song).filter(Song.song_uri == update_data["song_uri"]).update(
        update_data,
        synchronize_session=False,
    )
