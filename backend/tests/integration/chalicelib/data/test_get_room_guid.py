from typing import Optional

import pytest
from sqlalchemy.orm import Session

from chalicelib.data.queries.read_scalar_queries import read_room_guid_from_room_code
from chalicelib.data import db


@db.use_db_session(database="antwontest")
def read_room_guid_from_room_code_with_test_db(room_code: str, db_session: Session) -> None:
    actual_room_guid = read_room_guid_from_room_code(room_code=room_code, db_session=db_session)
    return actual_room_guid


@pytest.mark.parametrize(
    "example_room_code,expected_room_guid",
    [
        ("ABCDEF", "1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa"),
        ("nonexistent_room_code", None),
    ],
)
def test_read_room_guid_from_room_code(example_room_code: str, expected_room_guid: Optional[str]) -> None:
    actual_room_guid = read_room_guid_from_room_code_with_test_db(room_code=example_room_code)
    assert actual_room_guid == expected_room_guid
