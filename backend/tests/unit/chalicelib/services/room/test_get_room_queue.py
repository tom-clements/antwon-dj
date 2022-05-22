from unittest.mock import Mock, patch

import pytest

from chalicelib.services.room.get_room_queue import (
    get_room_queue_guest,
    get_room_queue_user,
)
from tests.unit.fixtures.queue import QueueResult


@pytest.mark.parametrize(
    "queue, is_room_exist",
    [
        (pytest.lazy_fixture("user_queue"), True),  # type: ignore
        (pytest.lazy_fixture("user_queue"), False),  # type: ignore
    ],
)
@patch("chalicelib.services.room.get_room_queue.read_room_queue_guest")
def test_read_room_queue_guest(mock_read_room_queue_guest: Mock, queue: QueueResult, is_room_exist: bool) -> None:
    room_guid = "room_guid"
    mock_read_room_queue_guest.return_value = [q.result for q in queue.sorted_songs]
    actual_queue = get_room_queue_guest.__wrapped__(room_guid)  # type: ignore
    assert actual_queue == [q.result for q in queue.sorted_songs]
    mock_read_room_queue_guest.assert_called_once_with(room_guid)


@pytest.mark.parametrize(
    "queue, is_room_exist",
    [
        (pytest.lazy_fixture("guest_queue"), True),  # type: ignore
        (pytest.lazy_fixture("guest_queue"), False),  # type: ignore
    ],
)
@patch("chalicelib.services.room.get_room_queue.read_room_queue_user")
@patch("chalicelib.services.room.get_room_queue.get_user_id_from_username")
def test_read_room_queue_user(
    mock_get_user_id_from_username: Mock,
    mock_read_room_queue_user: Mock,
    queue: QueueResult,
    is_room_exist: bool,
) -> None:
    room_guid = "room_guid"
    username = "username"
    user_id = 1
    mock_get_user_id_from_username.return_value = user_id
    mock_read_room_queue_user.return_value = [q.result for q in queue.sorted_songs]

    actual_queue = get_room_queue_user.__wrapped__(username, room_guid)  # type: ignore
    assert actual_queue == [q.result for q in queue.sorted_songs]
    mock_read_room_queue_user.assert_called_once_with(user_id, room_guid)

    mock_get_user_id_from_username.assert_called_once_with(username)
