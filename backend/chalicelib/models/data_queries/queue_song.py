from dataclasses import dataclass

from chalicelib.models.data_queries.base_db_dto import BaseDbDto


@dataclass
class QueueSong(BaseDbDto):
    room_song_guid: str
    song_uri: str
    song_name: str
    song_artist: str
    song_album_url: str  # datetime is not JSON serializable
    is_inactive: bool
    insert_time: str
    is_played: bool
    is_removed: bool


@dataclass
class QueueSongGuest(QueueSong):
    like_count: int = 0


@dataclass
class QueueSongUser(QueueSongGuest):
    is_user_liked: bool = False
