from typing import Union

from chalice import ForbiddenError, Response

from chalicelib.data.delete_room import delete_room
from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.read_one_queries import get_room_owner


def owner_delete_room(room_guid: str, username: str) -> Union[Response, None]:
    if is_room_exists(room_guid):
        room_owner = get_room_owner(room_guid)
        if room_owner != username:
            raise ForbiddenError("Insufficient permissions to perform this action")
        else:
            delete_room(room_guid)
    else:
        return Response(body="Room doesn't exist", status_code=409)
