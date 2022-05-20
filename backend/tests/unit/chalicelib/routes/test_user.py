import json
from dataclasses import asdict
from typing import Generator

from app import app
from unittest.mock import patch, Mock

from pytest import fixture
from chalice.test import Client

from chalicelib.models.cognito.tokens import TokenDto


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@patch("chalicelib.routes.user.user_login")
def test_room_get(mock_user_login: Mock, local_client: Client) -> None:
    mock_auth_url = "auth.mock_url.com/login"
    mock_user_login.return_value = mock_auth_url
    expected_headers = {"Location": mock_auth_url}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get("/login")
    mock_user_login.assert_called_once()
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.user_signup_callback")
@patch("chalicelib.routes.user.BASE_URL", "base_url.com")
def test_get_signup_callback(mock_user_signup_callback: Mock, local_client: Client) -> None:
    refresh_token = "refresh_token"
    code = "code"
    mock_user_signup_callback.return_value = refresh_token
    expected_headers = {"Location": "base_url.com", "Set-Cookie": f"refresh-token={refresh_token};Path=/;HttpOnly"}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get(f"/login/callback?code={code}")
    mock_user_signup_callback.assert_called_once_with(code=code)
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.headers["Set-Cookie"] == expected_headers["Set-Cookie"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.get_tokens_from_refresh")
def test_get_user_token(mock_get_tokens_from_refresh: Mock, local_client: Client) -> None:
    refresh_token = "refresh_token"

    expected_status_code = 200
    tokens = TokenDto(id_token="id_token", access_token="access_token", token_type="token_type", expires_in=0)
    expected_body = asdict(tokens)
    mock_get_tokens_from_refresh.return_value = tokens
    actual = local_client.http.post(
        "/user/token", headers={"Content-Type": "application/json"}, body=json.dumps({"refresh_token": refresh_token})
    )
    mock_get_tokens_from_refresh.assert_called_once_with(refresh_token=refresh_token)

    assert actual.json_body == expected_body
    assert actual.status_code == expected_status_code
