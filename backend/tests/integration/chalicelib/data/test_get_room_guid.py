import pytest

from chalicelib.data.read_scalar_queries import get_room_guid_from_room_code
from chalicelib.services.auth import db


@db.use_db_session(database="antwontest")
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
