from chalicelib.data.queries.create_room import create_room
from chalicelib.data.queries.read_scalar_queries import (
    read_user_id_from_username,
    read_room_guid_from_room_code,
    read_room_guid_from_username,
)
from chalicelib.services.exceptions import RoomAlreadyExistsServiceError, UserRoomExistsServiceError


def owner_add_room(room_code: str, username: str) -> None:
    owner_room = read_room_guid_from_username(username=username)
    if owner_room:
        raise UserRoomExistsServiceError(room_code)

    room_guid = read_room_guid_from_room_code(room_code)
    if room_guid:
        raise RoomAlreadyExistsServiceError(room_code)
    else:
        owner_user_id = read_user_id_from_username(username)
        return create_room(room_code, owner_user_id)
