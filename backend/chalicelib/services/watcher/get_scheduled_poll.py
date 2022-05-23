import asyncio
import time
from typing import List

import aiohttp

from chalicelib.data.queries.read_room import read_active_rooms
from chalicelib.services.watcher.watch_room import watch_room
from chalicelib.utils.env import API_URL, API_STAGE


async def fetch(http_session: aiohttp.ClientSession, url: str) -> str:
    async with http_session.get(url) as response:
        return await response.text()


async def poll_rooms_api(urls: List[str]) -> None:
    async with aiohttp.ClientSession() as http_session:
        tasks = [fetch(http_session, url) for url in urls]
        await asyncio.gather(*tasks)


async def poll_rooms_local(room_guids: List[str]) -> None:
    tasks = [watch_room(room_guid) for room_guid in room_guids]
    await asyncio.gather(*tasks)  # type: ignore


def async_poll_rooms_api(room_guids: List[str]) -> None:
    urls = [f"{API_URL}/{API_STAGE}/room/{room_guid}/watch" for room_guid in room_guids]
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(poll_rooms_api(urls))


def async_poll_rooms_local(room_guids: List[str]) -> None:
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(poll_rooms_local(room_guids))


def poll_five_seconds(local_polling: bool = True) -> None:
    for i in range(10):
        room_guids = read_active_rooms()
        if local_polling:
            async_poll_rooms_local(room_guids)
        else:
            async_poll_rooms_api(room_guids)
        time.sleep(5)
