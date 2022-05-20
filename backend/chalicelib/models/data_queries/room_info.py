from dataclasses import dataclass


@dataclass
class RoomInfo:
    room_code: str
    room_guid: str
    user_username: str
    is_inactive: bool
    create_time: str


@dataclass
class SpotifyRoomInfo:
    room_code: str
    spotify_user_username: str
