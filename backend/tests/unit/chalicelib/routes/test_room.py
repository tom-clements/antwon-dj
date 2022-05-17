import json
from dataclasses import asdict
from typing import Generator

from app import app
from unittest.mock import patch, Mock

from pytest import fixture
from chalice.test import Client

from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.exceptions import RoomNotFoundServiceError


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@patch("chalicelib.routes.room.get_room_guid")
def test_room_code_get(mock_get_room_guid: Mock, local_client: Client) -> None:
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


@patch("chalicelib.routes.room.get_room_queue_guest_from_room_guid")
def test_room_queue_guest_get(mock_get_room_queue_guest_from_room_guid: Mock, local_client: Client) -> None:
    room_guid = "test_room_guid"
    queue = [{"song": "test"}]
    mock_get_room_queue_guest_from_room_guid.return_value = queue
    response = local_client.http.get(f"/room/{room_guid}/queue/guest")
    mock_get_room_queue_guest_from_room_guid.assert_called_with(room_guid)
    assert response.json_body == queue
    assert response.status_code == 200

    mock_get_room_queue_guest_from_room_guid.side_effect = RoomNotFoundServiceError(room_guid)
    response = local_client.http.get(f"/room/{room_guid}/queue/guest")
    assert response.status_code == 404


@patch("chalicelib.routes.room.get_playing")
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
