from unittest.mock import patch, Mock

from chalicelib.services.user.get_login import (
    user_login,
    redirect_to_spotify_connect,
    redirect_to_client_with_tokens,
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


@patch("chalicelib.services.user.get_login.BASE_URL", "base_url.com")
def test_redirect_to_client_with_tokens() -> None:
    actual = redirect_to_client_with_tokens({"token1": "1", "token2": "2"})
    expected = "base_url.com/?token1=1&token2=2"
    assert actual == expected


@patch("chalicelib.services.user.get_login.get_tokens")
@patch("chalicelib.services.user.get_login.get_username_from_token")
@patch("chalicelib.services.user.get_login.add_user_if_not_exists")
@patch("chalicelib.services.user.get_login.redirect_to_client_with_tokens")
def test_user_signup_callback(
    mock_redirect_to_client_with_tokens: Mock,
    mock_add_user_if_not_exists: Mock,
    mock_get_username_from_token: Mock,
    mock_get_tokens: Mock,
) -> None:
    test_tokens = {"access_token": "test_access_token", "token_type": "test_token_type"}
    test_username = "test_username"
    test_code = "test_code"
    test_redirect_url = "test_redirct.com"
    expected = test_redirect_url

    mock_get_tokens.return_value = test_tokens
    mock_get_username_from_token.return_value = test_username
    mock_redirect_to_client_with_tokens.return_value = test_redirect_url

    actual = user_signup_callback(code=test_code)

    mock_get_tokens.assert_called_with(code=test_code)
    mock_get_username_from_token.assert_called_once_with(test_tokens["access_token"], test_tokens["token_type"])
    mock_add_user_if_not_exists.assert_called_once_with(test_username)
    mock_redirect_to_client_with_tokens.assert_called_once_with(test_tokens)
    assert actual == expected
