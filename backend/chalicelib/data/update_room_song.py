from sqlalchemy.orm import Session

from chalicelib.models import RoomSong
from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def update_added_to_playlist(next_song: NextSong, db_session: Session) -> None:
    db_session.query(RoomSong).filter(RoomSong.room_song_guid == next_song.room_song_guid).update(
        {RoomSong.is_added_to_playlist: True}, synchronize_session=False
    )


@use_db_session(commit=True)
def update_played(next_song: NextSong, db_session: Session) -> None:
    db_session.query(RoomSong).filter(RoomSong.room_song_guid == next_song.room_song_guid).update(
        {RoomSong.is_played: True}, synchronize_session=False
    )
