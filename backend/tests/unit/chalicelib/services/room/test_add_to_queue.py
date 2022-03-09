import datetime
from unittest.mock import patch

import pytest
from freezegun import freeze_time

from chalicelib.models import Song
from chalicelib.services.room.add_to_queue import (
    compare_songs,
)


@freeze_time("2022-01-01")
@pytest.mark.parametrize(
    "song,song_in_db, assert_called_with",
    [
        (
            {
                "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                "song_name": "Blank Space",
                "song_artist": "Taylor Swift",
                "song_album_url": "https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
            },
            Song(
                **{
                    "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                    "song_name": "Blank Space",
                    "song_artist": "Taylor Swift",
                    "song_album_url": "https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
                }
            ),
            {"song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g", "last_accessed": datetime.datetime(2022, 1, 1)},
        ),
        (
            {
                "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                "song_name": "Blank Space",
                "song_artist": "Taylor Swift",
                "song_album_url": "album_artwork_changed",
            },
            Song(
                **{
                    "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                    "song_name": "Blank Space",
                    "song_artist": "Taylor Swift",
                    "song_album_url": "https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
                }
            ),
            {
                "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                "song_name": "Blank Space",
                "song_artist": "Taylor Swift",
                "song_album_url": "album_artwork_changed",
                "last_accessed": datetime.datetime(2022, 1, 1),
            },
        ),
    ],
)
@patch("chalicelib.services.room.add_to_queue.update_song")
def test_compare_songs(update_song, song, song_in_db, assert_called_with):
    compare_songs(song, song_in_db)
    update_song.assert_called_with(assert_called_with)
