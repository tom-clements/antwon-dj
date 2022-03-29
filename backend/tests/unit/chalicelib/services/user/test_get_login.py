from unittest.mock import patch

import pytest
from chalice import Response

from chalicelib.services.user.get_login import (
    user_login,
    redirect_to_spotify_connect,
    redirect_to_client_with_tokens,
    user_signup_callback,
)


@pytest.mark.parametrize(
    "state,expected",
    [
        (
            None,
            Response(
                body="",
                headers={
                    "Location": "mock_auth_url.com/login?client_id=test_client_id&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=mock_redirect_url.com"
                },
                status_code=302,
            ),
        ),
        (
            "test_state",
            Response(
                body="",
                headers={
                    "Location": "mock_auth_url.com/login?client_id=test_client_id&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=mock_redirect_url.com&state=test_state"
                },
                status_code=302,
            ),
        ),
    ],
)
@patch("chalicelib.services.user.get_login.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.user.get_login.LOGIN_REDIRECT_URL", "mock_redirect_url.com")
def test_user_login(state, expected):
    actual = user_login.__wrapped__("test_client_id", state=state)
    assert actual.body == expected.body
    assert actual.headers == expected.headers
    assert actual.status_code == expected.status_code


@patch("chalicelib.services.user.get_login.API_URL", "api_url.com")
@patch("chalicelib.services.user.get_login.API_STAGE", "dev")
def test_redirect_to_spotify_connect():
    actual = redirect_to_spotify_connect("test_username")
    expected = Response(
        body="", headers={"Location": "api_url.com/dev/user/spotify/connect?username=test_username"}, status_code=302
    )
    assert actual.body == expected.body
    assert actual.headers == expected.headers
    assert actual.status_code == expected.status_code


@patch("chalicelib.services.user.get_login.BASE_URL", "base_url.com")
def test_redirect_to_client_with_tokens():
    actual = redirect_to_client_with_tokens({"token1": "1", "token2": "2"})
    expected = Response(body="", headers={"Location": "base_url.com/?token1=1&token2=2"}, status_code=302)
    assert actual.body == expected.body
    assert actual.headers == expected.headers
    assert actual.status_code == expected.status_code


@pytest.mark.parametrize(
    "spotify_login,expected",
    [
        (True, Response(body="", headers={"Location": "test_redirct_spotify.com"}, status_code=302)),
        (False, Response(body="", headers={"Location": "test_redirct_to_client.com"}, status_code=302)),
    ],
)
@patch("chalicelib.services.user.get_login.get_tokens")
@patch("chalicelib.services.user.get_login.get_username_from_token")
@patch("chalicelib.services.user.get_login.add_user_if_not_exists")
@patch("chalicelib.services.user.get_login.redirect_to_spotify_connect")
@patch("chalicelib.services.user.get_login.redirect_to_client_with_tokens")
def test_user_login(
    mock_redirect_to_client_with_tokens,
    mock_redirect_to_spotify_connect,
    mock_add_user_if_not_exists,
    mock_get_username_from_token,
    mock_get_tokens,
    spotify_login,
    expected,
):
    test_tokens = {"access_token": "test_access_token", "token_type": "test_token_type"}
    test_username = "test_username"
    test_code = "test_code"

    mock_get_tokens.return_value = test_tokens
    mock_get_username_from_token.return_value = test_username
    mock_redirect_to_spotify_connect.return_value = Response(
        body="", headers={"Location": "test_redirct_spotify.com"}, status_code=302
    )
    mock_redirect_to_client_with_tokens.return_value = Response(
        body="", headers={"Location": "test_redirct_to_client.com"}, status_code=302
    )

    actual = user_signup_callback(code=test_code, spotify_login=spotify_login)

    mock_get_tokens.assert_called_with(code=test_code)
    mock_get_username_from_token.assert_called_once_with(test_tokens["access_token"], test_tokens["token_type"])
    mock_add_user_if_not_exists.assert_called_once_with(test_username)
    if spotify_login:
        mock_redirect_to_spotify_connect.assert_called_once_with(test_username)
        mock_redirect_to_client_with_tokens.assert_not_called()
    else:
        mock_redirect_to_client_with_tokens.assert_called_once_with(test_tokens)
        mock_redirect_to_spotify_connect.assert_not_called()
    assert actual.body == expected.body
    assert actual.headers == expected.headers
    assert actual.status_code == expected.status_code
