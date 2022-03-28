import asyncio
import time
from typing import List

import aiohttp

from chalicelib.data.read_room import read_active_rooms
from chalicelib.utils.env import API_URL, API_STAGE


async def fetch(http_session: aiohttp.ClientSession, url: str):
    async with http_session.get(url) as response:
        return await response.text()


async def poll_rooms(urls: List[str]):
    async with aiohttp.ClientSession() as http_session:
        tasks = [fetch(http_session, url) for url in urls]
        await asyncio.gather(*tasks)


def poll_five_seconds():
    for i in range(10):
        active_rooms = read_active_rooms()
        room_guids = [room.room_guid for room in active_rooms]
        urls = [f"{API_URL}/{API_STAGE}/room/{room_guid}/watch" for room_guid in room_guids]
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(poll_rooms(urls))
        time.sleep(5)
