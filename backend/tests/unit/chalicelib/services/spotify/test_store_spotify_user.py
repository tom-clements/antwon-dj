from unittest.mock import patch, Mock

from chalicelib.services.spotify.store_spotify_user import store_spotify_user


@patch("chalicelib.services.spotify.store_spotify_user.get_token")
@patch("chalicelib.services.spotify.store_spotify_user.get_spotify")
@patch("chalicelib.services.spotify.store_spotify_user.add_spotify_user")
@patch("spotipy.Spotify")
def test_get_playlists_from_username(
    mock_spotify_session: Mock,
    mock_add_spotify_user: Mock,
    mock_get_spotify: Mock,
    mock_get_token: Mock,
) -> None:
    code = "code"
    username = "username"
    tokens = {"access_token": "access_token", "refresh_token": "refresh_token"}
    spotify_user = {"name": "spotify_name"}

    mock_get_token.return_value = tokens
    mock_get_spotify.return_value = mock_spotify_session
    mock_spotify_session.current_user.return_value = spotify_user

    store_spotify_user(code, username)

    mock_get_token.assert_called_once_with(code=code)
    mock_get_spotify.assert_called_once_with(auth=tokens["access_token"])
    mock_spotify_session.current_user.assert_called_once()
    mock_add_spotify_user.assert_called_once_with(
        username, tokens["access_token"], tokens["refresh_token"], spotify_user
    )
