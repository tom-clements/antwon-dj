from dataclasses import asdict
from typing import List, Dict

from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.queue.read_room_queue import read_room_queue_guest, read_room_queue_user
from chalicelib.data.read_scalar_queries import get_user_id_from_username
from chalicelib.services.exceptions import RoomNotFoundServiceError


def get_room_queue_guest_from_room_guid(room_guid: str) -> List[Dict[str, str]]:
    if not is_room_exists(room_guid=room_guid):
        raise RoomNotFoundServiceError(room_guid)
    room_queue = read_room_queue_guest(room_guid)
    return [asdict(r) for r in room_queue]


def get_room_queue_user_from_room_guid(username: str, room_guid: str) -> List[Dict[str, str]]:
    user_id = get_user_id_from_username(username)
    if not is_room_exists(room_guid=room_guid):
        raise RoomNotFoundServiceError(room_guid)
    room_queue = read_room_queue_user(user_id, room_guid)
    return [asdict(r) for r in room_queue]
