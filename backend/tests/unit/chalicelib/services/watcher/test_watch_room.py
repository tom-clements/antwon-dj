from unittest.mock import patch

import pytest

from chalicelib.services.watcher.watch_room import watch_room, process_next_song, check_next_song


@pytest.mark.parametrize(
    "next_song, current_playing, expected",
    [
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            {"song_uri": "example_uri1"},
            (True, True),
        ),
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            {"song_uri": "example_uri2"},
            (True, False),
        ),
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": True,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            {"song_uri": "example_uri1"},
            (False, True),
        ),
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": True,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            {"song_uri": "example_uri2"},
            (False, False),
        ),
    ],
)
@patch("chalicelib.services.watcher.watch_room.add_to_playlist")
@patch("chalicelib.services.watcher.watch_room.update_added_to_playlist")
@patch("chalicelib.services.watcher.watch_room.get_currently_playing")
@patch("chalicelib.services.watcher.watch_room.update_played")
def test_check_next_song(
    mock_update_played,
    mock_get_currently_playing,
    mock_update_added_to_playlist,
    mock_add_to_playlist,
    next_song,
    current_playing,
    expected,
):
    test_room_code = "TEST"
    mock_get_currently_playing.return_value = current_playing

    actual = check_next_song(next_song, test_room_code)
    assert actual == expected

    if not next_song["is_added_to_playlist"]:
        mock_add_to_playlist.assert_called_once_with(test_room_code, next_song["song_uri"])
        mock_update_added_to_playlist.assert_called_once_with(next_song)

    mock_get_currently_playing.assert_called_once_with(test_room_code, use_cache=False)

    if current_playing["song_uri"] == next_song["song_uri"]:
        mock_update_played.assert_called_once_with(next_song)


@pytest.mark.parametrize(
    "next_song, removed_from_queue, expected",
    [
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            False,
            (
                {
                    "room_song_id": 1,
                    "song_uri": "example_uri1",
                    "is_added_to_playlist": False,
                    "song_name": "song_name1",
                    "song_artist": "artist1, artist2",
                },
                True,
            ),
        ),
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
            },
            True,
            (
                {
                    "room_song_id": 2,
                    "song_uri": "example_uri2",
                    "is_added_to_playlist": False,
                    "song_name": "song_name2",
                    "song_artist": "artist1, artist2",
                },
                True,
            ),
        ),
    ],
)
@patch("chalicelib.services.watcher.watch_room.check_next_song")
@patch("chalicelib.services.watcher.watch_room.watch_room")
def test_process_next_song(mock_watch_room, mock_check_next_song, next_song, removed_from_queue, expected):
    test_room_code = "TEST"
    mock_check_next_song.return_value = True, removed_from_queue
    if removed_from_queue:
        mock_watch_room.return_value = expected
    else:
        mock_watch_room.return_value = next_song, True

    actual = process_next_song(next_song, test_room_code)
    assert actual == expected

    mock_check_next_song.assert_called_once_with(next_song, test_room_code)
    if removed_from_queue:
        mock_watch_room.assert_called_once_with(test_room_code)
    else:
        mock_watch_room.assert_not_called()


@pytest.mark.parametrize(
    "next_song, recommended_song, expected",
    [
        (None, None, (None, False)),
        (
            None,
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
                "is_played": False,
            },
            (
                {
                    "room_song_id": 1,
                    "song_uri": "example_uri1",
                    "is_added_to_playlist": False,
                    "song_name": "song_name1",
                    "song_artist": "artist1, artist2",
                    "is_played": False,
                },
                False,
            ),
        ),
        (
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
                "is_played": False,
            },
            None,
            (
                {
                    "room_song_id": 1,
                    "song_uri": "example_uri1",
                    "is_added_to_playlist": False,
                    "song_name": "song_name1",
                    "song_artist": "artist1, artist2",
                    "is_played": False,
                },
                False,
            ),
        ),
    ],
)
@patch("chalicelib.services.watcher.watch_room.read_top_room_song")
@patch("chalicelib.services.watcher.watch_room.get_recommended_song")
@patch("chalicelib.services.watcher.watch_room.process_next_song")
def test_watch_room(
    mock_process_next_song, mock_get_recommended_song, mock_read_top_room_song, next_song, recommended_song, expected
):
    test_room_code = "TEST"
    mock_read_top_room_song.return_value = next_song
    mock_get_recommended_song.return_value = recommended_song
    mock_process_next_song.return_value = expected

    actual = watch_room(test_room_code)
    assert actual == expected

    mock_read_top_room_song.assert_called_once_with(test_room_code)
    if next_song:
        mock_process_next_song.assert_called_once_with(next_song, test_room_code)
    else:
        mock_get_recommended_song.assert_called_once_with(test_room_code)
        if recommended_song:
            mock_process_next_song.assert_called_once_with(recommended_song, test_room_code)
        else:
            mock_process_next_song.assert_not_called()
