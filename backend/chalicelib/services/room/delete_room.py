from chalicelib.data.delete_room import db_delete_room
from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.read_one_queries import get_room_owner
from chalicelib.services.exceptions import RoomNotFoundServiceError, ForbiddenServiceError


def owner_delete_room(room_guid: str, username: str) -> None:
    if is_room_exists(room_guid):
        room_owner = get_room_owner(room_guid)
        if room_owner != username:
            raise ForbiddenServiceError()
        else:
            db_delete_room(room_guid)
    else:
        raise RoomNotFoundServiceError(room_guid)
