from chalicelib.data.create_room import create_room
from chalicelib.data.read_scalar_queries import get_user_id_from_username, get_room_guid_from_room_code
from chalicelib.services.exceptions import RoomAlreadyExistsServiceError


def owner_add_room(room_code: str, username: str) -> None:
    owner_user_id = get_user_id_from_username(username)
    room_guid = get_room_guid_from_room_code(room_code)
    if room_guid:
        raise RoomAlreadyExistsServiceError(room_code)
    else:
        return create_room(room_code, owner_user_id)
