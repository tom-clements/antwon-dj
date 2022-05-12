from dataclasses import asdict
from typing import Optional
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.spotify_api.playing_result import SpotifyPlaying
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.spotify.get_playing import (
    _is_playing_a_song,
    _get_placeholder_empty_song,
    get_playing,
    _spotify_playing_cached,
)
from tests.unit.chalicelib.services.spotify.example_playing import (
    get_example_playing,
    get_example_playing_podcast,
)
from tests.unit.chalicelib.services.spotify.example_tracks import (
    get_example_empty_track_formatted,
    get_example_track_formatted,
)


@pytest.mark.parametrize("expected_playing", [get_example_playing(), None])
@patch("spotipy.Spotify")
def test_spotify_playing_cached(mock_spotify_session: Mock, expected_playing: SpotifyPlaying) -> None:
    if expected_playing:
        mock_spotify_session.currently_playing.return_value = asdict(expected_playing)
    else:
        mock_spotify_session.currently_playing.return_value = None
    actual_playing = _spotify_playing_cached(
        room_guid="test_room_guid", ttl_hash=1, spotify_session=mock_spotify_session
    )
    mock_spotify_session.currently_playing.assert_called()
    assert actual_playing == expected_playing


@pytest.mark.parametrize(
    "playing, expected_output",
    [
        (get_example_playing(), True),
        (get_example_playing_podcast(), False),
        (None, False),
    ],
)
def test_is_playing_a_song(playing: Optional[SpotifyPlaying], expected_output: bool) -> None:
    actual_output = _is_playing_a_song(playing)
    assert actual_output == expected_output


def test_get_placeholder_empty_song() -> None:
    expected = get_example_empty_track_formatted()
    actual = _get_placeholder_empty_song()
    assert actual == expected


@pytest.mark.parametrize(
    "playing_result, expected_output",
    [
        (get_example_playing(), get_example_track_formatted()),
        (get_example_playing_podcast(), get_example_empty_track_formatted()),
        (None, get_example_empty_track_formatted()),
    ],
)
@patch("chalicelib.services.spotify.get_playing._spotify_playing_cached")
@patch("chalicelib.services.spotify.get_playing.is_room_exists", return_value=True)
def test_get_playing(
    mock_is_room_exists: Mock,
    mock_spotify_playing_cached: Mock,
    playing_result: Optional[SpotifyPlaying],
    expected_output: SpotifyTrackFormatted,
) -> None:
    room_guid = "test_room_guid"
    mock_spotify_playing_cached.return_value = playing_result
    actual_output = get_playing(room_guid=room_guid)
    mock_is_room_exists.assert_called_with(room_guid)
    mock_spotify_playing_cached.assert_called()
    assert actual_output == expected_output
