from typing import List, Dict

from chalicelib.data.read_room_queue import read_room_queue


def get_room_queue_from_room_code(room_guid: str) -> List[Dict[str, str]]:
    room_queue = read_room_queue(room_guid)
    return sorted([dict(r) for r in room_queue], key=lambda x: x["insert_time"])
