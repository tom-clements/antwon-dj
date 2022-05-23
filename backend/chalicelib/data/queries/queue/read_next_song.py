from typing import Optional

from chalicelib.data.queries.queue.read_room_queue import read_queue_column_query
from chalicelib.models.data_queries.next_song import NextSong


def read_next_song(room_guid: str) -> Optional[NextSong]:
    next_song = read_queue_column_query(room_guid=room_guid, cols=NextSong.sqlalchemy_columns()).first()
    return NextSong(**next_song) if next_song else None
