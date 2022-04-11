from dataclasses import asdict
from typing import Optional
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.spotify_api.currently_playing_result import SpotifyCurrentlyPlaying
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.spotify.get_current_playing import (
    is_currently_playing_a_song,
    get_placeholder_empty_song,
    get_currently_playing,
    spotify_currently_playing_cached,
)
from tests.unit.chalicelib.services.spotify.example_currently_playing import (
    get_example_current_playing,
    get_example_current_playing_podcast,
)
from tests.unit.chalicelib.services.spotify.example_tracks import (
    get_example_empty_track_formatted,
    get_example_track_formatted,
)


@pytest.mark.parametrize("expected_playing", [get_example_current_playing(), None])
@patch("spotipy.Spotify")
def test_spotify_currently_playing_cached(
    mock_spotify_session: Mock, expected_playing: SpotifyCurrentlyPlaying
) -> None:
    if expected_playing:
        mock_spotify_session.currently_playing.return_value = asdict(expected_playing)
    else:
        mock_spotify_session.currently_playing.return_value = None
    actual_playing = spotify_currently_playing_cached(
        room_guid="test_room_guid", ttl_hash=1, spotify_session=mock_spotify_session
    )
    mock_spotify_session.currently_playing.assert_called()
    assert actual_playing == expected_playing


@pytest.mark.parametrize(
    "currently_playing, expected_output",
    [
        (get_example_current_playing(), True),
        (get_example_current_playing_podcast(), False),
        (None, False),
    ],
)
def test_is_currently_playing_a_song(
    currently_playing: Optional[SpotifyCurrentlyPlaying], expected_output: bool
) -> None:
    actual_output = is_currently_playing_a_song(currently_playing)
    assert actual_output == expected_output


def test_get_placeholder_empty_song() -> None:
    expected = get_example_empty_track_formatted()
    actual = get_placeholder_empty_song()
    assert actual == expected


@pytest.mark.parametrize(
    "currently_playing_result, expected_output",
    [
        (get_example_current_playing(), get_example_track_formatted()),
        (get_example_current_playing_podcast(), get_example_empty_track_formatted()),
        (None, get_example_empty_track_formatted()),
    ],
)
@patch("chalicelib.services.spotify.get_current_playing.spotify_currently_playing_cached")
def test_get_currently_playing(
    mock_spotify_currently_playing_cached: Mock,
    currently_playing_result: Optional[SpotifyCurrentlyPlaying],
    expected_output: SpotifyTrackFormatted,
) -> None:
    mock_spotify_currently_playing_cached.return_value = currently_playing_result
    actual_output = get_currently_playing(room_guid="test_room_guid")
    mock_spotify_currently_playing_cached.assert_called()
    assert actual_output == expected_output
