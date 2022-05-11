from dataclasses import asdict
from typing import List, Dict

from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.read_room_queue import read_room_queue
from chalicelib.services.exceptions import RoomNotFoundServiceError


def get_room_queue_from_room_guid(room_guid: str) -> List[Dict[str, str]]:
    if not is_room_exists(room_guid):
        raise RoomNotFoundServiceError(room_guid)
    room_queue = read_room_queue(room_guid)
    return sorted([asdict(r) for r in room_queue], key=lambda x: x["insert_time"])
