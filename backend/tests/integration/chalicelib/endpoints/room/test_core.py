import pytest
from sqlalchemy.exc import NoResultFound

from chalicelib.antwondb.db import use_db_session
from chalicelib.antwondb.schema import Room
from chalicelib.endpoints.room.core import (
    get_room_guid_from_room_code,
    get_room_queue_from_room_guid,
    add_room,
    delete_room,
)

from sqlalchemy.engine import Row


@use_db_session(database="antwontest")
def get_room_guid_from_room_code_with_test_db(room_code, db_session):
    actual_room_guid = get_room_guid_from_room_code(room_code=room_code, db_session=db_session)
    return actual_room_guid


@pytest.mark.parametrize(
    "example_room_code,expected_room_guid",
    [
        ("ABCDEF", "1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa"),
        ("nonexistent_room_code", None),
    ],
)
def test_get_room_guid_from_room_code(example_room_code, expected_room_guid):
    actual_room_guid = get_room_guid_from_room_code_with_test_db(room_code=example_room_code)
    assert actual_room_guid == expected_room_guid


@use_db_session(database="antwontest")
def get_room_queue_from_room_guid_with_test_db(room_guid, db_session):
    actual_queue = get_room_queue_from_room_guid(room_guid=room_guid, db_session=db_session)
    return actual_queue


@pytest.mark.parametrize(
    "room_guid,expected_queue",
    [
        (
            "1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa",
            [
                {
                    "room_song_guid": "7aa3c95c-7406-4a47-af5a-5c087fa4c6b1",
                    "song_uri": "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
                    "song_name": "Blank Space",
                    "song_artist": "Taylor Swift",
                    "song_album_url": "https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
                    "is_inactive": False,
                    "insert_time": "2022-02-16 23:48:51",
                    "is_played": False,
                    "is_removed": False,
                }
            ],
        ),
        ("non_existent_room_guid", []),
    ],
)
def test_get_room_queue_from_room_guid(room_guid, expected_queue):
    actual_queue = get_room_queue_from_room_guid_with_test_db(room_guid=room_guid)
    actual_queue = [dict(q) for q in actual_queue]
    assert actual_queue == expected_queue


@use_db_session(database="antwontest", rollback=True)
def add_and_delete_room_with_test_db(db_session):
    room_code = "XTESTX"
    add_room(db_session=db_session, room_code=room_code)
    # will throw  NoResultFound if not there
    created_room = db_session.query(Room).filter(Room.room_code == room_code).one()

    delete_room(db_session=db_session, room_guid=created_room.room_guid)
    with pytest.raises(NoResultFound) as excinfo:
        db_session.query(Room).filter(Room.room_code == room_code).one()

    assert "No row was found when one was required" == str(excinfo.value)


def test_add_and_delete_room():
    add_and_delete_room_with_test_db()
