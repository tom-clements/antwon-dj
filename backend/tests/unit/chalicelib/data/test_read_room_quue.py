from dataclasses import asdict
from typing import List
from unittest.mock import patch, Mock

import pytest

from chalicelib.data.read_room_queue import read_room_queue
from chalicelib.models.data_queries.queue_song import QueueSong


@pytest.mark.parametrize(
    "room_guid,expected_queue",
    [
        (
            "example_room_guid",
            [
                QueueSong(
                    room_song_guid="b8392152-28fa-491f-9264-b712959b87bf",
                    song_uri="spotify:track:6JrVslK5MhhIt8uIW0rKEI",
                    song_name="Pohyby",
                    song_artist="Lucie",
                    song_album_url="https://i.scdn.co/image/ab67616d0000b273dab507cabaf07f2574a6857d",
                    is_inactive=False,
                    insert_time="2022-02-14 12:49:58",
                    is_played=False,
                    is_removed=False,
                ),
                QueueSong(
                    room_song_guid="8d24d85c-03f2-49cd-a9f5-027a34c75665",
                    song_uri="spotify:track:5MMu9zi4UrctTCXQqNJUCY",
                    song_name="Feels Great (feat. Fetty Wap & CVBZ)",
                    song_artist="Cheat Codes, Fetty Wap, CVBZ",
                    song_album_url="https://i.scdn.co/image/ab67616d0000b27351b72b5206bf06e035993d66",
                    is_inactive=False,
                    insert_time="2022-02-14 12:50:01",
                    is_played=False,
                    is_removed=False,
                ),
            ],
        ),
        ("example_room_code", []),
    ],
)
@patch("sqlalchemy.orm.session.Session")
def test_get_room_queue_from_room_guid(mock_db_session: Mock, room_guid: str, expected_queue: List[QueueSong]) -> None:
    mock_db_session.query.return_value.join.return_value.join.return_value.filter.return_value.all.return_value = [
        asdict(q) for q in expected_queue
    ]
    actual_queue = read_room_queue(room_guid=room_guid, db_session=mock_db_session)
    assert actual_queue == expected_queue
