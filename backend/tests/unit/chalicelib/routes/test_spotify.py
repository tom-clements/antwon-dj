from typing import Generator

from app import app
from unittest.mock import patch, Mock

from pytest import fixture
from chalice.test import Client


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@patch("chalicelib.routes.spotify.store_spotify_user")
@patch("chalicelib.routes.spotify.BASE_URL", "base_url.com")
def test_spotify_callback_get(mock_store_spotify_user: Mock, local_client: Client) -> None:
    code = "code"
    state = "username"
    expected_headers = {"Location": "base_url.com"}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get(f"/user/spotify/callback?code={code}&state={state}")
    mock_store_spotify_user.assert_called_once_with(code=code, username=state)
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.status_code == expected_status_code
