from unittest.mock import patch, Mock

from chalicelib.services.auth.cognito.responses import CodeTokenDto, UserInfoDto
from chalicelib.services.user.get_login import (
    user_login,
    redirect_to_spotify_connect,
    user_signup_callback,
)


@patch("chalicelib.services.user.get_login.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.user.get_login.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.user.get_login.API_STAGE", "mock_stage")
@patch("chalicelib.services.user.get_login.LOGIN_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
def test_user_login() -> None:
    expected = (
        "mock_auth_url.com/login?client_id=test_client_id&response_type=code&scope="
        "aws.cognito.signin.user.admin+email+openid+profile&"
        "redirect_uri=mock_redirect_url.com/mock_stage/mock_redirect_endpoint"
    )
    actual = user_login.__wrapped__("test_client_id")  # type: ignore
    assert actual == expected


@patch("chalicelib.services.user.get_login.API_URL", "api_url.com")
@patch("chalicelib.services.user.get_login.API_STAGE", "dev")
def test_redirect_to_spotify_connect() -> None:
    actual = redirect_to_spotify_connect("test_username")
    expected = "api_url.com/dev/user/spotify/connect?username=test_username"
    assert actual == expected


@patch("chalicelib.services.user.get_login.get_tokens_from_code")
@patch("chalicelib.services.user.get_login.get_cognito_user_info")
@patch("chalicelib.services.user.get_login.add_user_if_not_exists")
def test_user_signup_callback(
    mock_add_user_if_not_exists: Mock,
    mock_get_cognito_user_info: Mock,
    mock_get_tokens_from_code: Mock,
) -> None:
    tokens = CodeTokenDto(
        access_token="access_token",
        token_type="token_type",
        id_token="id_token",
        refresh_token="refresh_token",
        expires_in=0,
    )
    user_info = UserInfoDto(sub="sub", email_verified="true", name="name", email="email", username="username")
    code = "code"
    expected = tokens.refresh_token

    mock_get_tokens_from_code.return_value = tokens
    mock_get_cognito_user_info.return_value = user_info
    actual = user_signup_callback(code=code)

    mock_get_tokens_from_code.assert_called_with(code=code)
    mock_get_cognito_user_info.assert_called_once_with(tokens.access_token, tokens.token_type)
    mock_add_user_if_not_exists.assert_called_once_with(user_info.username)
    assert actual == expected
