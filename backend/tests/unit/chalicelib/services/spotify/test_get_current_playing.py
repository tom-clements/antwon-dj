from unittest.mock import patch

import pytest

from chalicelib.services.spotify.get_current_playing import (
    is_currently_playing_a_song,
    get_placeholder_empty_song,
    get_currently_playing,
    spotify_currently_playing_cached,
)


@pytest.mark.parametrize(
    "expected_playing",
    [{"item": {}}, None],
)
@patch("spotipy.Spotify")
def test_spotify_currently_playing_cached(mock_spotify_session, expected_playing):
    mock_spotify_session.currently_playing.return_value = expected_playing
    actual_playing = spotify_currently_playing_cached(
        room_guid="test_room_guid", ttl_hash=1, spotify_session=mock_spotify_session
    )
    mock_spotify_session.currently_playing.assert_called()
    assert actual_playing == expected_playing


@pytest.mark.parametrize(
    "currently_playing, expected_output",
    [({"item": {"name": "test_name"}}, True), ({"item": {}}, False), (None, False)],
)
def test_is_currently_playing_a_song(currently_playing, expected_output):
    actual_output = is_currently_playing_a_song(currently_playing)
    assert actual_output == expected_output


#
def test_get_placeholder_empty_song():
    expected = {
        "id": "1",
        "song_uri": "a",
        "song_artist": "Add Songs to Queue",
        "song_name": "No Song Playing",
        "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    }
    actual = get_placeholder_empty_song()
    assert actual == expected


@pytest.mark.parametrize(
    "currently_playing_result, expected_output",
    [
        (
            {
                "item": {
                    "name": "test_name",
                    "uri": "test_uri",
                    "artists": [{"name": "test_artist_name1"}, {"name": "test_artist_name2"}],
                    "album": {"images": [{"url": "test_url"}]},
                }
            },
            {
                "song_uri": "test_uri",
                "song_name": "test_name",
                "song_artist": "test_artist_name1, test_artist_name2",
                "song_album_url": "test_url",
            },
        ),
        (
            {"item": {}},
            {
                "id": "1",
                "song_uri": "a",
                "song_artist": "Add Songs to Queue",
                "song_name": "No Song Playing",
                "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
            },
        ),
        (
            None,
            {
                "id": "1",
                "song_uri": "a",
                "song_artist": "Add Songs to Queue",
                "song_name": "No Song Playing",
                "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
            },
        ),
    ],
)
@patch("chalicelib.services.spotify.get_current_playing.spotify_currently_playing_cached")
def test_get_currently_playing(mock_spotify_currently_playing_cached, currently_playing_result, expected_output):
    mock_spotify_currently_playing_cached.return_value = currently_playing_result
    actual_output = get_currently_playing(room_guid="test_room_guid")
    assert actual_output == expected_output
