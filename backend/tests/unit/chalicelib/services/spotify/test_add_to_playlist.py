from dataclasses import asdict
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.spotify_api.playlist import SpotifyPlaylist
from chalicelib.services.spotify.add_to_playlist import (
    _create_playlist,
    _get_playlist,
    _add_to_spotify_playlist,
)
from tests.unit.chalicelib.services.spotify.example_playlist import get_example_playlist


@patch("spotipy.Spotify")
def test_create_playlist(mock_spotify_session: Mock) -> None:
    spotify_user_username = "test_spotify_username"
    playlist_name = "test_playlist_name"
    test_room_guid = "test_room_guid"
    _create_playlist(
        playlist_name, spotify_user_username, room_guid=test_room_guid, spotify_session=mock_spotify_session
    )
    mock_spotify_session.user_playlist_create.assert_called_with(
        spotify_user_username, playlist_name, public=True, collaborative=False, description=""
    )


@pytest.mark.parametrize(
    "playlist_name,playlist",
    [
        ("test_playlist_name", get_example_playlist(name="test_playlist_name")),
        ("test_playlist_name", get_example_playlist(name="diff_test_playlist_name")),
    ],
)
@patch("spotipy.Spotify")
def test_get_playlist(mock_spotify_session: Mock, playlist_name: str, playlist: SpotifyPlaylist) -> None:
    mock_spotify_session.current_user_playlists.return_value = {"items": [asdict(playlist)]}
    actual_playlist = _get_playlist(playlist_name, room_guid="test_room_guid", spotify_session=mock_spotify_session)
    if playlist_name == playlist.name:
        assert actual_playlist == playlist
    if playlist_name != playlist.name:
        assert actual_playlist is None


@patch("spotipy.Spotify")
def test_add_to_spotify_playlist(mock_spotify_session: Mock) -> None:
    playlist_id = "test_playlist_id"
    items = ["test_song_uri"]
    _add_to_spotify_playlist(playlist_id, items, room_guid="test_room_guid", spotify_session=mock_spotify_session)
    mock_spotify_session.playlist_add_items.assert_called_with(playlist_id=playlist_id, items=items)
