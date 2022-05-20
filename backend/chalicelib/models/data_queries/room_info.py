from dataclasses import dataclass

from chalicelib.models.data_queries.base_db_dto import BaseDbDto


@dataclass
class RoomInfo(BaseDbDto):
    room_code: str
    room_guid: str
    user_username: str
    is_inactive: bool
    create_time: str


@dataclass
class SpotifyRoomInfo(BaseDbDto):
    room_code: str
    spotify_user_username: str
