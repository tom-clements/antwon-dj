from chalicelib.data.delete_room_songs import delete_room_songs
from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.read_one_queries import get_room_owner
from chalicelib.services.exceptions import ForbiddenServiceError, RoomNotFoundServiceError


def delete_queue(room_guid: str, username: str) -> None:
    if is_room_exists(room_guid):
        room_owner = get_room_owner(room_guid)
        if room_owner != username:
            raise ForbiddenServiceError("Insufficient permissions to perform this action")
        else:
            delete_room_songs(room_guid)
    else:
        raise RoomNotFoundServiceError(room_guid)
