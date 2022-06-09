import asyncio
from typing import List

import aiohttp

from chalicelib.utils.env import API_URL, API_STAGE


async def fetch(http_session: aiohttp.ClientSession, url: str) -> str:
    async with http_session.get(url) as response:
        return await response.text()


async def poll_rooms_api(urls: List[str]) -> None:
    async with aiohttp.ClientSession() as http_session:
        tasks = [fetch(http_session, url) for url in urls]
        await asyncio.gather(*tasks)


def async_poll_rooms_api(room_guids: List[str]) -> None:
    urls = [f"{API_URL}/{API_STAGE}/room/{room_guid}/watch" for room_guid in room_guids]
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(poll_rooms_api(urls))
