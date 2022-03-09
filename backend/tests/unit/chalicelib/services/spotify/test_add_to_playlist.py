from unittest.mock import patch

import pytest

from chalicelib.services.spotify.add_to_playlist import (
    create_playlist,
    get_playlist,
    add_to_spotify_playlist,
)


@patch("spotipy.Spotify")
def test_create_playlist(mock_spotify_session):
    spotify_user_username = "test_spotify_username"
    playlist_name = "test_playlist_name"
    room_guid = "test_room_guid"
    create_playlist(playlist_name, spotify_user_username, room_guid=room_guid, spotify_session=mock_spotify_session)
    mock_spotify_session.user_playlist_create.assert_called_with(
        spotify_user_username, playlist_name, public=True, collaborative=False, description=""
    )


@pytest.mark.parametrize(
    "playlist_name,playlist_search_result,expected_playlist",
    [
        ("test_playlist_name", {"items": [{"name": "test_playlist_name"}]}, {"name": "test_playlist_name"}),
        ("test_playlist_name", {"items": [{"name": "test_diff_playlist_name"}]}, None),
    ],
)
@patch("spotipy.Spotify")
def test_get_playlist(mock_spotify_session, playlist_name, playlist_search_result, expected_playlist):
    mock_spotify_session.current_user_playlists.return_value = playlist_search_result
    actual_playlist = get_playlist(playlist_name, room_guid="test_room_guid", spotify_session=mock_spotify_session)
    assert actual_playlist == expected_playlist


@patch("spotipy.Spotify")
def test_add_to_spotify_playlist(mock_spotify_session):
    playlist_id = "test_playlist_id"
    items = ["test_song_uri"]
    add_to_spotify_playlist(playlist_id, items, room_guid="test_room_guid", spotify_session=mock_spotify_session)
    mock_spotify_session.playlist_add_items.assert_called_with(playlist_id=playlist_id, items=items)
