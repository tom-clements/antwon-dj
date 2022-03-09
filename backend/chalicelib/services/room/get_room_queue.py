from typing import List

from sqlalchemy.engine import Row

from chalicelib.data.read_room_queue import read_room_queue


def get_room_queue_from_room_guid(room_guid: str) -> List[Row]:
    return read_room_queue(room_guid)
