from typing import Generator

from app import app
from unittest.mock import patch, Mock

from pytest import fixture
from chalice.test import Client

from chalicelib.services.exceptions import NonExistantRoomServiceError


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@patch("chalicelib.routes.room.get_room_guid")
def test_room_get(mock_get_room_guid: Mock, local_client: Client) -> None:
    room_guid = "test_room_guid"
    room_code = "test_room_code"
    mock_get_room_guid.return_value = room_guid
    expected = {"room_guid": room_guid}
    response = local_client.http.get(f"/code/{room_code}")
    mock_get_room_guid.assert_called_with(room_code)
    assert response.json_body == expected
    assert response.status_code == 200

    mock_get_room_guid.side_effect = NonExistantRoomServiceError(room_guid)
    response = local_client.http.get(f"/code/{room_code}")
    assert response.status_code == 404


@patch("chalicelib.routes.room.get_room_queue_from_room_guid")
def test_room_queue_get(mock_get_room_queue_from_room_guid: Mock, local_client: Client) -> None:
    room_guid = "test_room_guid"
    queue = [{"song": "test"}]
    expected = {"room_queue": queue}
    mock_get_room_queue_from_room_guid.return_value = queue
    response = local_client.http.get(f"/room/{room_guid}/queue")
    mock_get_room_queue_from_room_guid.assert_called_with(room_guid)
    assert response.json_body == expected
    assert response.status_code == 200

    mock_get_room_queue_from_room_guid.side_effect = NonExistantRoomServiceError(room_guid)
    response = local_client.http.get(f"/room/{room_guid}/queue")
    assert response.status_code == 404
