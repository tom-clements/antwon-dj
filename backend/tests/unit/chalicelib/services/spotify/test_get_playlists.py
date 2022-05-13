from unittest.mock import patch, Mock

from chalicelib.services.spotify.get_playlists import retrieve_playlists_from_room_guid, get_playlists_from_username
from tests.unit.chalicelib.services.spotify.example_playlist import get_example_api_playlist, get_example_playlist


@patch("spotipy.Spotify")
def test_retrieve_playlists_from_room_guid(mock_spotify_session: Mock) -> None:
    expected = [get_example_playlist(), get_example_playlist()]
    mock_spotify_session.current_user_playlists.return_value = {
        "items": [get_example_api_playlist(), get_example_api_playlist()]
    }

    actual = retrieve_playlists_from_room_guid.__wrapped__(  # type: ignore
        spotify_session=mock_spotify_session, room_guid="room_guid"
    )
    mock_spotify_session.current_user_playlists.assert_called_once()
    assert actual == expected


@patch("chalicelib.services.spotify.get_playlists.get_room_guid_from_username")
@patch("chalicelib.services.spotify.get_playlists.retrieve_playlists_from_room_guid")
def test_rget_playlists_from_username(
    mock_retrieve_playlists_from_room_guid: Mock, mock_get_room_guid_from_username: Mock
) -> None:
    expected = [get_example_playlist(), get_example_playlist()]
    username = "username"
    room_guid = "room_guid"
    mock_get_room_guid_from_username.return_value = room_guid
    mock_retrieve_playlists_from_room_guid.return_value = expected

    actual = get_playlists_from_username(username)
    mock_get_room_guid_from_username.assert_called_once_with(username)
    mock_retrieve_playlists_from_room_guid.assert_called_once_with(room_guid=room_guid)
    assert actual == expected
