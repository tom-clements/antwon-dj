from typing import List

from chalicelib.data.queries.queue.read_room_queue import read_room_queue_guest, read_room_queue_user
from chalicelib.data.queries.read_scalar_queries import get_user_id_from_username
from chalicelib.models.data_queries.queue_song import QueueSongGuest, QueueSongUser
from chalicelib.services.utils.verify_room import verify_room_exists


@verify_room_exists
def get_room_queue_guest(room_guid: str) -> List[QueueSongGuest]:
    return read_room_queue_guest(room_guid)


@verify_room_exists
def get_room_queue_user(username: str, room_guid: str) -> List[QueueSongUser]:
    user_id = get_user_id_from_username(username)
    return read_room_queue_user(user_id, room_guid)
