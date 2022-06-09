import time
from enum import Enum
from typing import Callable

from chalicelib.data.queries.read_room import read_active_rooms
from chalicelib.services.watcher.poll.local import local_poll
from chalicelib.services.watcher.poll.parallel_api import async_poll_rooms_api
from chalicelib.services.watcher.poll.parallel_local import async_poll_rooms_local


class PollMode(Enum):
    LOCAL: Callable = local_poll
    ASYNC_LOCAL: Callable = async_poll_rooms_local
    ASYNC_API: Callable = async_poll_rooms_api


def poll_five_seconds(poll_mode: PollMode) -> None:
    for _ in range(10):
        room_guids = read_active_rooms()
        poll_mode.value(room_guids)
        time.sleep(5)
