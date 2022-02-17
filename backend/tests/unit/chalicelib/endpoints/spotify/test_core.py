from unittest.mock import patch

import pytest

from chalicelib.endpoints.spotify.core import search_songs, format_songs


@pytest.mark.parametrize(
    "example_input,expected_output",
    [
        (
            {
                "tracks": {
                    "items": [
                        {
                            "uri": "example_uri1",
                            "name": "song_name1",
                            "artists": [{"name": "artist1"}, {"name": "artist2"}],
                            "album": {"images": [{"url": "image1address.com"}]},
                        },
                        {
                            "uri": "example_uri2",
                            "name": "song_name2",
                            "artists": [{"name": "artist3"}],
                            "album": {"images": [{"url": "image2address.com"}]},
                        },
                    ]
                }
            },
            [
                {
                    "id": "example_uri1",
                    "song_artist": "artist1, artist2",
                    "song_name": "song_name1",
                    "song_album_url": "image1address.com",
                },
                {
                    "id": "example_uri2",
                    "song_artist": "artist3",
                    "song_name": "song_name2",
                    "song_album_url": "image2address.com",
                },
            ],
        ),
        (
            {
                "tracks": {
                    "items": [],
                }
            },
            [],
        ),
    ],
)
def test_format_songs(example_input, expected_output):
    actual_output = format_songs(example_input)
    assert actual_output == expected_output


@pytest.mark.parametrize(
    "example_song_query,spotify_search_result,expected_search_result",
    [
        (
            "example_song_query1",
            {
                "tracks": {
                    "items": [
                        {
                            "uri": "example_uri1",
                            "name": "song_name1",
                            "artists": [{"name": "artist1"}, {"name": "artist2"}],
                            "album": {"images": [{"url": "image1address.com"}]},
                        },
                        {
                            "uri": "example_uri2",
                            "name": "song_name2",
                            "artists": [{"name": "artist3"}],
                            "album": {"images": [{"url": "image2address.com"}]},
                        },
                    ]
                }
            },
            [
                {
                    "id": "example_uri1",
                    "song_artist": "artist1, artist2",
                    "song_name": "song_name1",
                    "song_album_url": "image1address.com",
                },
                {
                    "id": "example_uri2",
                    "song_artist": "artist3",
                    "song_name": "song_name2",
                    "song_album_url": "image2address.com",
                },
            ],
        ),
        (
            "example_song_query2",
            {
                "tracks": {
                    "items": [],
                }
            },
            [],
        ),
    ],
)
@patch("sqlalchemy.orm.session.Session")
@patch("chalice.app.Blueprint")
def test_search_songs(
    spotify_session, spotify_routes, example_song_query, spotify_search_result, expected_search_result
):
    spotify_session.search.return_value = spotify_search_result
    actual_search_result = search_songs(
        spotify_session=spotify_session, song_query=example_song_query, room_guid="test", spotify_routes=spotify_routes
    )
    assert actual_search_result == expected_search_result
