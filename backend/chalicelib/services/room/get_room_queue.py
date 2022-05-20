from dataclasses import asdict
from typing import List, Dict

from chalicelib.data.queue.read_room_queue import read_room_queue_guest, read_room_queue_user
from chalicelib.data.read_scalar_queries import get_user_id_from_username
from chalicelib.services.utils.verify_room import verify_room_exists


@verify_room_exists
def get_room_queue_guest_from_room_guid(room_guid: str) -> List[Dict[str, str]]:
    room_queue = read_room_queue_guest(room_guid)
    return [asdict(r) for r in room_queue]


@verify_room_exists
def get_room_queue_user_from_room_guid(username: str, room_guid: str) -> List[Dict[str, str]]:
    user_id = get_user_id_from_username(username)
    room_queue = read_room_queue_user(user_id, room_guid)
    return [asdict(r) for r in room_queue]
