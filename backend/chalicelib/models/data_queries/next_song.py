from dataclasses import dataclass

from chalicelib.models.data_queries.base_db_dto import BaseDbDto


@dataclass
class NextSong(BaseDbDto):
    room_song_guid: str
    song_uri: str
    is_added_to_playlist: bool
    song_name: str
    song_artist: str
    is_played: bool
