import datetime
import uuid
from typing import Any, Dict

from sqlalchemy.orm import session

from chalicelib.models import Song
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def create_song(song: Dict[str, Any], db_session: session) -> None:
    new_song = Song(
        song_guid=str(uuid.uuid4()), insert_time=datetime.datetime.now(), last_accessed=datetime.datetime.now(), **song
    )
    db_session.add(new_song)
