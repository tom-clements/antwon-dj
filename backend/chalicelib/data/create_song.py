import datetime
import uuid
from dataclasses import asdict

from sqlalchemy.orm import Session

from chalicelib.models import Song
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def create_song(song: SpotifyTrackFormatted, db_session: Session) -> None:
    new_song = Song(
        song_guid=str(uuid.uuid4()),
        insert_time=datetime.datetime.now(),
        last_accessed=datetime.datetime.now(),
        **asdict(song)
    )
    db_session.add(new_song)
