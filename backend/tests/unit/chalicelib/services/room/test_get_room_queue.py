from unittest.mock import Mock, patch

import pytest

from chalicelib.services.exceptions import RoomNotFoundServiceError
from chalicelib.services.room.get_room_queue import (
    get_room_queue_guest_from_room_guid,
    get_room_queue_user_from_room_guid,
)
from tests.unit.fixtures.queue import QueueResult


@pytest.mark.parametrize(
    "queue, is_room_exist",
    [
        (pytest.lazy_fixture("user_queue"), True),  # type: ignore
        (pytest.lazy_fixture("user_queue"), False),  # type: ignore
    ],
)
@patch("chalicelib.services.room.get_room_queue.is_room_exists")
@patch("chalicelib.services.room.get_room_queue.read_room_queue_guest")
def test_read_room_queue_guest(
    mock_read_room_queue_guest: Mock, mock_is_room_exists: Mock, queue: QueueResult, is_room_exist: bool
) -> None:
    room_guid = "room_guid"
    mock_is_room_exists.return_value = is_room_exist
    mock_read_room_queue_guest.return_value = [q.result for q in queue.sorted_songs]

    try:
        actual_queue = get_room_queue_guest_from_room_guid(room_guid)
        assert actual_queue == [q.db_result for q in queue.sorted_songs]
        mock_read_room_queue_guest.assert_called_once_with(room_guid)
    except RoomNotFoundServiceError:
        pass

    mock_is_room_exists.assert_called_once_with(room_guid=room_guid)


@pytest.mark.parametrize(
    "queue, is_room_exist",
    [
        (pytest.lazy_fixture("guest_queue"), True),  # type: ignore
        (pytest.lazy_fixture("guest_queue"), False),  # type: ignore
    ],
)
@patch("chalicelib.services.room.get_room_queue.is_room_exists")
@patch("chalicelib.services.room.get_room_queue.read_room_queue_user")
@patch("chalicelib.services.room.get_room_queue.get_user_id_from_username")
def test_read_room_queue_user(
    mock_get_user_id_from_username: Mock,
    mock_read_room_queue_user: Mock,
    mock_is_room_exists: Mock,
    queue: QueueResult,
    is_room_exist: bool,
) -> None:
    room_guid = "room_guid"
    username = "username"
    user_id = 1
    mock_get_user_id_from_username.return_value = user_id
    mock_is_room_exists.return_value = is_room_exist
    mock_read_room_queue_user.return_value = [q.result for q in queue.sorted_songs]

    try:
        actual_queue = get_room_queue_user_from_room_guid(username, room_guid)
        assert actual_queue == [q.db_result for q in queue.sorted_songs]
        mock_read_room_queue_user.assert_called_once_with(user_id, room_guid)
    except RoomNotFoundServiceError:
        pass

    mock_get_user_id_from_username.assert_called_once_with(username)
    mock_is_room_exists.assert_called_once_with(room_guid=room_guid)
