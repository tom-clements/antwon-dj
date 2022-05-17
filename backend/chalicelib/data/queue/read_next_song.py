from dataclasses import fields
from typing import Optional, Final, List

from sqlalchemy import column

from chalicelib.data.queue.read_room_queue import read_queue_column_query
from chalicelib.models.data_queries.next_song import NextSong

NEX_SONG_COLS: Final[List[column]] = [column(col.name) for col in fields(NextSong)]


def read_next_song(room_guid: str) -> Optional[NextSong]:
    next_song = read_queue_column_query(room_guid=room_guid, cols=NEX_SONG_COLS).first()
    return NextSong(**next_song) if next_song else None
