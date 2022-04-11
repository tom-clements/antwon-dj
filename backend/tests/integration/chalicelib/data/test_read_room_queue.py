from typing import List

import pytest
from sqlalchemy.orm import Session

from chalicelib.data.read_room_queue import read_room_queue
from chalicelib.models.data_queries.queue_song import QueueSong
from chalicelib.services.auth.db import use_db_session


@use_db_session(database="antwontest")
def read_room_queue_test_db(room_guid: str, db_session: Session) -> List[QueueSong]:
    actual_queue = read_room_queue(room_guid=room_guid, db_session=db_session)
    return actual_queue


@pytest.mark.parametrize(
    "room_guid,expected_queue",
    [
        (
            "1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa",
            [
                QueueSong(
                    room_song_guid="7aa3c95c-7406-4a47-af5a-5c087fa4c6b1",
                    song_uri="spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                    song_name="Blank Space",
                    song_artist="Taylor Swift",
                    song_album_url="https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
                    is_inactive=False,
                    insert_time="2022-02-16 23:48:51",
                    is_played=False,
                    is_removed=False,
                )
            ],
        ),
        ("non_existent_room_code", []),
    ],
)
def test_read_room_queue(room_guid: str, expected_queue: List[QueueSong]) -> None:
    actual_queue = read_room_queue_test_db(room_guid=room_guid)
    assert actual_queue == expected_queue
