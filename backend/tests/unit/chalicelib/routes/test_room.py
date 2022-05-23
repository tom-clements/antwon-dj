import json
from dataclasses import asdict
from typing import Generator

import pytest
from pytest_mock import MockerFixture

from app import app
from unittest.mock import Mock, MagicMock

from pytest import fixture
from chalice.test import Client

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.data_queries.room_info import RoomInfo
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.exceptions import (
    RoomNotFoundServiceError,
    ServiceError,
    ForbiddenServiceError,
    NotFoundServiceError,
)
from tests.unit.fixtures.queue import QueueResult


@pytest.fixture
def mock_owner_get_room(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.owner_get_room")


@pytest.fixture
def mock_owner_delete_room(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.owner_delete_room")


@pytest.fixture
def mock_owner_add_room(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.owner_add_room")


@pytest.fixture
def mock_get_room_guid(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.get_room_guid")


@pytest.fixture
def mock_owner_get_playing(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.get_playing")


@pytest.fixture
def mock_get_room_queue_guest(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.get_room_queue_guest")


@pytest.fixture
def mock_get_room_queue_user(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.get_room_queue_user")


@pytest.fixture
def mock_get_playing(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("chalicelib.routes.room.get_playing")


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@pytest.mark.parametrize(
    "side_effect, status_code",
    [(None, 200), (NotFoundServiceError, 404), (ForbiddenServiceError, 403)],
)
def test_room_code_get(
    mock_get_room_guid: Mock, side_effect: ServiceError, status_code: int, local_client: Client
) -> None:
    room_guid = "test_room_guid"
    room_code = "test_room_code"
    mock_get_room_guid.return_value = room_guid
    response = local_client.http.get(f"/code/{room_code}")
    mock_get_room_guid.assert_called_with(room_code)
    assert response.body.decode("UTF-8") == json.dumps(room_guid)
    assert response.status_code == 200

    mock_get_room_guid.side_effect = RoomNotFoundServiceError(room_guid)
    response = local_client.http.get(f"/code/{room_code}")
    assert response.status_code == 404


def test_room_get(
    mock_owner_get_room: Mock,
    local_client: Client,
    cognito_user_info: CognitoUserInfoDto,
    room_info: RoomInfo,
    user_token: str,
) -> None:
    mock_owner_get_room.return_value = room_info
    headers = {"authorization": f"Bearer {user_token}"}
    response = local_client.http.get(f"/room/{room_info.room_guid}", headers=headers)
    mock_owner_get_room.assert_called_with(room_guid=room_info.room_guid, username=cognito_user_info.username)
    assert json.loads(response.body.decode("UTF-8")) == asdict(room_info)
    assert response.status_code == 200


@pytest.mark.parametrize(
    "side_effect, status_code",
    [(None, 200), (NotFoundServiceError, 404), (ForbiddenServiceError, 403)],
)
def test_room_delete(
    mock_owner_delete_room: Mock,
    side_effect: ServiceError,
    status_code: int,
    local_client: Client,
    cognito_user_info: CognitoUserInfoDto,
    room_info: RoomInfo,
    user_token: str,
) -> None:
    headers = {"authorization": f"Bearer {user_token}"}
    mock_owner_delete_room.side_effect = side_effect

    response = local_client.http.delete(f"/room/{room_info.room_guid}", headers=headers)

    mock_owner_delete_room.assert_called_with(room_guid=room_info.room_guid, username=cognito_user_info.username)
    if side_effect:
        assert "APIError" in json.loads(response.body.decode("UTF-8"))["Code"]
    else:
        assert json.loads(response.body.decode("UTF-8")) is None
    assert response.status_code == status_code


@pytest.mark.parametrize(
    "side_effect, status_code",
    [(None, 200), (NotFoundServiceError, 404), (ForbiddenServiceError, 403)],
)
def test_room_add(
    mock_owner_add_room: Mock,
    side_effect: ServiceError,
    status_code: int,
    local_client: Client,
    cognito_user_info: CognitoUserInfoDto,
    user_token: str,
) -> None:
    headers = {"authorization": f"Bearer {user_token}", "Content-Type": "application/json"}
    data = {"room_code": "room_code"}

    mock_owner_add_room.side_effect = side_effect
    response = local_client.http.post("/room", headers=headers, body=json.dumps(data))
    mock_owner_add_room.assert_called_with(room_code=data["room_code"], username=cognito_user_info.username)
    if side_effect:
        assert "APIError" in json.loads(response.body.decode("UTF-8"))["Code"]
    else:
        assert json.loads(response.body.decode("UTF-8")) is None
    assert response.status_code == status_code


def test_room_queue_guest_get(
    mock_get_room_queue_guest: Mock, local_client: Client, guest_queue_no_params: QueueResult
) -> None:
    room_guid = "test_room_guid"
    mock_get_room_queue_guest.return_value = [r.result for r in guest_queue_no_params.sorted_songs]
    response = local_client.http.get(f"/room/{room_guid}/queue/guest")
    mock_get_room_queue_guest.assert_called_with(room_guid)
    assert response.json_body == [r.db_result for r in guest_queue_no_params.sorted_songs]
    assert response.status_code == 200

    mock_get_room_queue_guest.side_effect = RoomNotFoundServiceError(room_guid)
    response = local_client.http.get(f"/room/{room_guid}/queue/guest")
    assert response.status_code == 404


def test_room_playing_get(mock_get_playing: Mock, local_client: Client) -> None:
    room_guid = "test_room_guid"
    playing = SpotifyTrackFormatted(
        song_uri="song_uri", song_artist="song_artist", song_name="song_name", song_album_url="song_a"
    )
    mock_get_playing.return_value = playing
    response = local_client.http.get(f"/room/{room_guid}/playing")
    mock_get_playing.assert_called_with(room_guid=room_guid)
    assert response.json_body == asdict(playing)
    assert response.status_code == 200

    mock_get_playing.side_effect = RoomNotFoundServiceError(room_guid)
    response = local_client.http.get(f"/room/{room_guid}/playing")
    assert response.status_code == 404
