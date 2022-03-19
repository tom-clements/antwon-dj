from unittest.mock import patch

import pytest

from chalicelib.services.watcher.spotify_recommender import get_spotify_recommended_song, get_recommended_song


@patch("spotipy.Spotify")
def test_get_spotify_recommended_song(mock_spotify_session):
    test_uris = ["test_uri1", "test_uri2"]
    recommended_tracks = {
        "tracks": [
            {
                "uri": "example_uri1",
                "name": "song_name1",
                "artists": [{"name": "artist1"}, {"name": "artist2"}],
                "album": {"images": [{"url": "image1address.com"}]},
            }
        ]
    }
    expected = {
        "song_uri": "example_uri1",
        "song_artist": "artist1, artist2",
        "song_name": "song_name1",
        "song_album_url": "image1address.com",
    }
    mock_spotify_session.recommendations.return_value = recommended_tracks
    actual = get_spotify_recommended_song.__wrapped__(test_uris, mock_spotify_session, "test_room_code")
    mock_spotify_session.recommendations.assert_called_once_with(seed_tracks=test_uris, country="GB", limit=1)
    assert actual == expected


@pytest.mark.parametrize(
    "previous_track_uris, recommended_song, expected",
    [
        ([], None, None),
        (
            ["test_uri1", "test_uri2", "test_uri3"],
            {
                "song_uri": "example_uri1",
                "song_artist": "artist1, artist2",
                "song_name": "song_name1",
                "song_album_url": "image1address.com",
            },
            {
                "room_song_id": 1,
                "song_uri": "example_uri1",
                "is_added_to_playlist": False,
                "song_name": "song_name1",
                "song_artist": "artist1, artist2",
                "is_played": False,
            },
        ),
    ],
)
@patch("chalicelib.services.watcher.spotify_recommender.read_last_five_played_tracked")
@patch("chalicelib.services.watcher.spotify_recommender.get_spotify_recommended_song")
@patch("chalicelib.services.watcher.spotify_recommender.read_top_room_song")
@patch("chalicelib.services.watcher.spotify_recommender.add_song_to_room_queue")
def test_get_recommended_song(
    mock_add_song_to_room_queue,
    mock_read_top_room_song,
    mock_get_spotify_recommended_song,
    mock_read_last_five_played_tracked,
    previous_track_uris,
    recommended_song,
    expected,
):
    test_room_guid = "test_room_guid"
    mock_read_last_five_played_tracked.return_value = previous_track_uris
    mock_get_spotify_recommended_song.return_value = recommended_song
    mock_read_top_room_song.return_value = expected

    actual = get_recommended_song(test_room_guid)

    mock_read_last_five_played_tracked.assert_called_once_with(test_room_guid)
    assert actual == expected

    if not previous_track_uris:
        mock_get_spotify_recommended_song.assert_not_called()
        mock_add_song_to_room_queue.assert_not_called()
        mock_read_top_room_song.assert_not_called()
    else:
        mock_get_spotify_recommended_song.assert_called_once_with(previous_track_uris, room_guid=test_room_guid)
        mock_add_song_to_room_queue.assert_called_once_with(recommended_song, test_room_guid)
        mock_read_top_room_song.assert_called_once_with(test_room_guid)
