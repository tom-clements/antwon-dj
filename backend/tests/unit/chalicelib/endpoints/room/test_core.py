from unittest.mock import patch

import pytest

from chalicelib.endpoints.room.core import get_room_guid_from_room_code, get_room_queue_from_room_guid


@pytest.mark.parametrize(
    "example_room_code,expected_room_guid",
    [
        ("example_room_code", "expected_room_guid"),
        ("nonexistent_room_code", None),
    ],
)
@patch("sqlalchemy.orm.session.Session")
def test_get_room_guid_from_room_code(db_session, example_room_code, expected_room_guid):
    db_session.query.return_value.filter.return_value.scalar.return_value = expected_room_guid
    actual_room_guid = get_room_guid_from_room_code(room_code=example_room_code, db_session=db_session)
    assert actual_room_guid == expected_room_guid


@pytest.mark.parametrize(
    "example_room_guid,expected_queue",
    [
        (
            "example_room_guid",
            [
                (
                    "b8392152-28fa-491f-9264-b712959b87bf",
                    "spotify:track:6JrVslK5MhhIt8uIW0rKEI",
                    "Pohyby",
                    "Lucie",
                    "https://i.scdn.co/image/ab67616d0000b273dab507cabaf07f2574a6857d",
                    False,
                    "2022-02-14 12:49:58",
                    False,
                    False,
                ),
                (
                    "8d24d85c-03f2-49cd-a9f5-027a34c75665",
                    "spotify:track:5MMu9zi4UrctTCXQqNJUCY",
                    "Feels Great (feat. Fetty Wap & CVBZ)",
                    "Cheat Codes, Fetty Wap, CVBZ",
                    "https://i.scdn.co/image/ab67616d0000b27351b72b5206bf06e035993d66",
                    False,
                    "2022-02-14 12:50:01",
                    False,
                    False,
                ),
            ],
        ),
        ("example_room_guid", None),
    ],
)
@patch("sqlalchemy.orm.session.Session")
def test_get_room_queue_from_room_guid(db_session, example_room_guid, expected_queue):
    db_session.query.return_value.join.return_value.join.return_value.filter.return_value.all.return_value = (
        expected_queue
    )
    actual_queue = get_room_queue_from_room_guid(room_guid=example_room_guid, db_session=db_session)
    assert actual_queue == expected_queue
