from typing import List
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.services.spotify.recommender import _get_spotify_recommended_song, get_recommended_song
from tests.unit.chalicelib.data.example_next_song import get_example_next_song
from tests.unit.chalicelib.services.spotify.example_recommender_result import (
    get_example_api_recommended,
    get_example_recommended,
)
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_track_formatted


@patch("spotipy.Spotify")
def test_get_spotify_recommended_song(mock_spotify_session: Mock) -> None:
    test_uris = ["test_uri1", "test_uri2"]
    recommended_tracks = get_example_api_recommended()
    expected = get_example_recommended()

    mock_spotify_session.recommendations.return_value = recommended_tracks
    actual = _get_spotify_recommended_song.__wrapped__(  # type: ignore
        test_uris, mock_spotify_session, "test_room_code"
    )
    mock_spotify_session.recommendations.assert_called_once_with(seed_tracks=test_uris, country="GB", limit=1)
    assert actual == expected


@pytest.mark.parametrize(
    "previous_track_uris, expected",
    [
        ([], None),
        (["test_uri1", "test_uri2", "test_uri3"], get_example_next_song()),
    ],
)
@patch("chalicelib.services.spotify.recommender.read_last_five_played_tracked")
@patch("chalicelib.services.spotify.recommender._get_spotify_recommended_song")
@patch("chalicelib.services.spotify.recommender.read_next_song")
@patch("chalicelib.services.spotify.recommender.add_song_to_room_queue")
@patch("chalicelib.services.spotify.recommender.format_songs")
def test_get_recommended_song(
    mock_format_songs: Mock,
    mock_add_song_to_room_queue: Mock,
    mock_read_next_song: Mock,
    mock_get_spotify_recommended_song: Mock,
    mock_read_last_five_played_tracked: Mock,
    previous_track_uris: List[str],
    expected: NextSong,
) -> None:
    test_room_guid = "test_room_guid"
    mock_read_last_five_played_tracked.return_value = previous_track_uris
    mock_get_spotify_recommended_song.return_value = get_example_recommended()
    mock_format_songs.return_value = [get_example_track_formatted()]
    mock_read_next_song.return_value = expected

    actual = get_recommended_song(test_room_guid)
    assert actual == expected

    # Assert function calls
    mock_read_last_five_played_tracked.assert_called_once_with(test_room_guid)
    if not previous_track_uris:
        mock_get_spotify_recommended_song.assert_not_called()
        mock_add_song_to_room_queue.assert_not_called()
        mock_read_next_song.assert_not_called()
    else:
        mock_get_spotify_recommended_song.assert_called_once_with(previous_track_uris, room_guid=test_room_guid)
        mock_format_songs.assert_called_once_with(get_example_recommended().tracks)
        mock_add_song_to_room_queue.assert_called_once_with(get_example_track_formatted(), test_room_guid)
        mock_read_next_song.assert_called_once_with(test_room_guid)
