from unittest.mock import patch

from chalicelib.services.spotify.auth import app_authorization, SCOPES


def test_scopes():
    scopes = (
        "playlist-read-collaborative user-modify-playback-state user-read-playback-state "
        "user-read-private playlist-modify-private playlist-modify-public"
    )
    assert SCOPES == scopes


@patch("chalicelib.services.spotify.auth.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.spotify.auth.SPOTIFY_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
@patch("chalicelib.services.spotify.auth.API_STAGE", "mock_stage")
def test_cognito_login_url() -> None:
    spotify_id = "spotify_id"
    expected = (
        "https://accounts.spotify.com/authorize?"
        "response_type=code&"
        f"client_id={spotify_id}&"
        f"scope={SCOPES.replace(' ', '%20')}&"
        "redirect_uri=mock_redirect_url.com/mock_stage/mock_redirect_endpoint"
    )
    actual = app_authorization.__wrapped__(spotify_id)  # type: ignore
    assert actual == expected
