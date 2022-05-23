from chalicelib.data.queries.read_room_info import read_room_info
from chalicelib.models.data_queries.room_info import RoomInfo
from chalicelib.services.utils.verify_room import verify_room_exists, verify_room_owner


@verify_room_exists
@verify_room_owner
def owner_get_room(room_guid: str, username: str) -> RoomInfo:
    return read_room_info(room_guid)
