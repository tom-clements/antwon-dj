from dataclasses import dataclass


@dataclass
class NextSong:
    room_song_id: int
    song_uri: str
    is_added_to_playlist: bool
    song_name: str
    song_artist: str
    is_played: bool
