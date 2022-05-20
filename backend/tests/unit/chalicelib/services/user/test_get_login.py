from unittest.mock import patch, Mock

from chalicelib.models.cognito.tokens import CodeTokenDto
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
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
    cognito_user_info: CognitoUserInfoDto,
    code_token: CodeTokenDto,
) -> None:
    code = "code"
    expected = code_token.refresh_token

    mock_get_tokens_from_code.return_value = code_token
    mock_get_cognito_user_info.return_value = cognito_user_info
    actual = user_signup_callback(code=code)

    mock_get_tokens_from_code.assert_called_with(code=code)
    mock_get_cognito_user_info.assert_called_once_with(code_token.access_token, code_token.token_type)
    mock_add_user_if_not_exists.assert_called_once_with(cognito_user_info.username)
    assert actual == expected
