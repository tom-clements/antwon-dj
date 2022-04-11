from dataclasses import dataclass


@dataclass
class QueueSong:
    room_song_guid: str
    song_uri: str
    song_name: str
    song_artist: str
    song_album_url: str
    is_inactive: bool
    insert_time: str
    is_played: bool
    is_removed: bool
