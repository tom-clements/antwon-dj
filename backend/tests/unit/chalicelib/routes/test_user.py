from dataclasses import asdict
from typing import Generator

from app import app
from unittest.mock import patch, Mock

from pytest import fixture
from chalice.test import Client

from chalicelib.models.cognito.tokens import TokenDto
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.endpoints.user_info import UserInfoDto


@fixture
def local_client() -> Generator:
    with Client(app, stage_name="local") as client:
        yield client


@patch("chalicelib.routes.user.cognito_login_url")
def test_login_get(mock_user_login_url: Mock, local_client: Client) -> None:
    mock_auth_url = "auth.mock_url.com/login"
    mock_user_login_url.return_value = mock_auth_url
    expected_headers = {"Location": mock_auth_url}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get("/login")
    mock_user_login_url.assert_called_once()
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.cognito_logout_url")
def test_logout_get(mock_cognito_logout_url: Mock, local_client: Client) -> None:
    mock_auth_url = "auth.mock_url.com/logout"
    mock_cognito_logout_url.return_value = mock_auth_url
    expected_headers = {"Location": mock_auth_url}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get("/logout")
    mock_cognito_logout_url.assert_called_once()
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.user_signup_callback")
@patch("chalicelib.routes.user.BASE_URL", "base_url.com")
@patch("chalicelib.routes.user.DOMAIN", "domain.com")
def test_get_login_callback(mock_user_signup_callback: Mock, local_client: Client) -> None:
    refresh_token = "refresh_token"
    code = "code"
    mock_user_signup_callback.return_value = refresh_token
    cookie_str = (
        f"refresh-token={refresh_token};"
        "Domain=domain.com;"
        "Max-Age=604800;"
        "Path=/;"
        "HttpOnly;"
        "Secure;"
        "SameSite=Strict"
    )
    expected_headers = {"Location": "base_url.com/login", "Set-Cookie": cookie_str}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get(f"/login/callback?code={code}")
    mock_user_signup_callback.assert_called_once_with(code=code)
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.headers["Set-Cookie"] == expected_headers["Set-Cookie"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.BASE_URL", "base_url.com")
@patch("chalicelib.routes.user.DOMAIN", "domain.com")
def test_get_logout_callback(local_client: Client) -> None:
    cookie_str = "refresh-token='';Domain=domain.com;Expires=0;Path=/;HttpOnly;Secure;SameSite=Strict"
    expected_headers = {"Location": "base_url.com/logout", "Set-Cookie": cookie_str}
    expected_body = None
    expected_status_code = 302
    actual = local_client.http.get("/logout/callback")
    assert actual.json_body == expected_body
    assert actual.headers["Location"] == expected_headers["Location"]
    assert actual.headers["Set-Cookie"] == expected_headers["Set-Cookie"]
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.cognito_tokens_refresh_token_request")
def test_get_user_token(mock_cognito_tokens_refresh_token_request: Mock, local_client: Client) -> None:
    refresh_token = "refresh_token"

    expected_status_code = 200
    tokens = TokenDto(id_token="id_token", access_token="access_token", token_type="token_type", expires_in=0)
    expected_body = asdict(tokens)
    mock_cognito_tokens_refresh_token_request.return_value = tokens
    actual = local_client.http.get(
        "/user/token", headers={"Content-Type": "application/json", "Cookie": f"refresh-token={refresh_token}"}
    )
    # mock_cognito_tokens_refresh_token_request.assert_called_once_with(refresh_token=refresh_token)

    assert actual.json_body == expected_body
    assert actual.status_code == expected_status_code


@patch("chalicelib.routes.user.get_is_spotify_connected")
@patch("chalicelib.routes.user.get_room_code_from_username")
def test_user_info_get(
    mock_get_room_code_from_username: Mock,
    mock_get_is_spotify_connected: Mock,
    cognito_user_info: CognitoUserInfoDto,
    user_token: str,
    local_client: Client,
) -> None:
    room_code = "room_code"
    headers = {"authorization": f"Bearer {user_token}"}
    mock_get_is_spotify_connected.return_value = True
    mock_get_room_code_from_username.return_value = room_code

    expected_body = asdict(UserInfoDto(is_spotify_connected=True, room_code=room_code, **asdict(cognito_user_info)))
    actual = local_client.http.get("/user/info", headers=headers)
    # mock_cognito_tokens_refresh_token_request.assert_called_once_with(refresh_token=refresh_token)

    assert actual.json_body == expected_body
    assert actual.status_code == 200
