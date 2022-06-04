import time

from chalicelib.data.queries.read_room import read_active_rooms
from chalicelib.services.watcher.parallel_poll.api import async_poll_rooms_api
from chalicelib.services.watcher.parallel_poll.local import async_poll_rooms_local


def poll_five_seconds(local_polling: bool = True) -> None:
    for _ in range(10):
        room_guids = read_active_rooms()
        if local_polling:
            async_poll_rooms_local(room_guids)
        else:
            async_poll_rooms_api(room_guids)
        time.sleep(5)
