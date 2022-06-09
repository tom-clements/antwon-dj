from unittest.mock import patch, Mock, call

import pytest
import asyncio

from chalicelib.services.watcher.poll.parallel_local import async_watch_room, poll_rooms_local


@pytest.mark.asyncio
@patch("chalicelib.services.watcher.poll.parallel_local.watch_room")
async def test_async_watch_room(mock_watch_room: Mock) -> None:
    room_guid = "room_guid"
    await async_watch_room(room_guid)
    mock_watch_room.assert_called_once_with(room_guid)


@patch("chalicelib.services.watcher.poll.parallel_local.watch_room")
def test_poll_rooms_local(mock_watch_room: Mock) -> None:
    room_guids = ["room_guid1", "room_guid2"]
    asyncio.run(poll_rooms_local(room_guids))
    mock_watch_room.assert_has_calls([call(room_guid) for room_guid in room_guids])
