import asyncio
from typing import List, Tuple

from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.services.watcher.watch_room import watch_room


async def async_watch_room(room_guid: str) -> Tuple[NextSong, bool]:
    return watch_room(room_guid)


async def poll_rooms_local(room_guids: List[str]) -> None:
    tasks = [asyncio.create_task(async_watch_room(room_guid)) for room_guid in room_guids]
    for task in tasks:
        await task


def async_poll_rooms_local(room_guids: List[str]) -> None:
    asyncio.run(poll_rooms_local(room_guids))
