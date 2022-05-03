import datetime
from dataclasses import asdict
from typing import Any, Dict
from unittest.mock import patch, Mock

import pytest
from freezegun import freeze_time

from chalicelib.models import Song
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.room.add_to_queue import (
    _compare_songs,
)
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_track_formatted


@freeze_time("2022-01-01")
@pytest.mark.parametrize(
    "song, song_in_db, assert_called_with",
    [
        (
            get_example_track_formatted(song_uri="test_uri"),
            Song(**asdict(get_example_track_formatted(song_uri="test_uri"))),
            {"song_uri": "test_uri", "last_accessed": datetime.datetime(2022, 1, 1)},
        ),
        (
            get_example_track_formatted(song_uri="test_uri", song_name="Name Changed"),
            Song(**asdict(get_example_track_formatted(song_uri="test_uri"))),
            {
                **asdict(get_example_track_formatted(song_uri="test_uri", song_name="Name Changed")),
                "last_accessed": datetime.datetime(2022, 1, 1),
            },
        ),
    ],
)
@patch("chalicelib.services.room.add_to_queue.update_song")
def test_compare_songs(
    mock_update_song: Mock, song: SpotifyTrackFormatted, song_in_db: Song, assert_called_with: Dict[str, Any]
) -> None:
    _compare_songs(song, song_in_db)
    mock_update_song.assert_called_with(assert_called_with)
