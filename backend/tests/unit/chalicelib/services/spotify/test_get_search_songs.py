from typing import List, Dict, Any
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.spotify_api.search_result import SpotifySearchResult
from chalicelib.models.spotify_api.track import SpotifyTrack, SpotifyTrackFormatted
from chalicelib.services.spotify.get_search_songs import format_songs, search_songs, _spotify_api_search
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_track_formatted, get_example_track
from tests.unit.chalicelib.services.spotify.example_seach_result import (
    get_example_search_result,
    get_example_search_result_formatted,
    get_example_search_no_result,
    get_example_api_search_result,
    get_example_search_api_no_result,
)


@pytest.mark.parametrize(
    "example_input,expected_output",
    [
        ([get_example_track(), get_example_track()], [get_example_track_formatted(), get_example_track_formatted()]),
        ([], []),
    ],
)
def test_format_songs(example_input: List[SpotifyTrack], expected_output: List[SpotifyTrackFormatted]) -> None:
    actual_output = format_songs(example_input)
    assert actual_output == expected_output


@pytest.mark.parametrize(
    "spotify_search_result,expected",
    [
        (get_example_api_search_result(), get_example_search_result()),
        (get_example_search_api_no_result(), get_example_search_no_result()),
    ],
)
@patch("spotipy.Spotify")
def test_spotify_api_search(
    mock_spotipy_session: Mock, spotify_search_result: Dict[str, Any], expected: SpotifySearchResult
) -> None:
    example_song_query = "example_song_query"
    example_room_guid = "example_room_guid"
    mock_spotipy_session.search.return_value = spotify_search_result
    actual = _spotify_api_search.__wrapped__(  # type: ignore
        spotify_session=mock_spotipy_session, song_query=example_song_query, room_guid=example_room_guid
    )
    mock_spotipy_session.search.assert_called_with(q=example_song_query, type="track")
    assert actual == expected


@pytest.mark.parametrize(
    "spotify_search_result,expected",
    [(get_example_search_result(), get_example_search_result_formatted()), (get_example_search_no_result(), [])],
)
@patch("chalicelib.services.spotify.get_search_songs._spotify_api_search")
@patch("chalicelib.services.spotify.get_search_songs.is_room_exists", return_value=True)
def test_search_songs(
    mock_is_room_exists: Mock,
    mock_spotify_api_search: Mock,
    spotify_search_result: SpotifySearchResult,
    expected: List[SpotifyTrackFormatted],
) -> None:
    example_song_query = "example_song_query"
    example_room_guid = "example_room_guid"
    mock_spotify_api_search.return_value = spotify_search_result
    actual = search_songs(song_query=example_song_query, room_guid=example_room_guid)
    mock_is_room_exists.assert_called_once_with(example_room_guid)
    mock_spotify_api_search.assert_called_once_with(song_query=example_song_query, room_guid=example_room_guid)
    assert actual == expected
