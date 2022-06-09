from typing import List

from chalicelib.services.watcher.watch_room import watch_room


def local_poll(room_guids: List[str]) -> None:
    for room_guid in room_guids:
        watch_room(room_guid)
