from typing import Optional
from unittest.mock import patch, Mock

import pytest

from chalicelib.data.queries.read_scalar_queries import read_room_guid_from_room_code


@pytest.mark.parametrize(
    "example_room_code,expected_room_guid",
    [
        ("example_room_code", "expected_room_guid"),
        ("nonexistent_room_code", None),
    ],
)
@patch("sqlalchemy.orm.session.Session")
def test_read_room_guid_from_room_code(
    db_session: Mock, example_room_code: str, expected_room_guid: Optional[None]
) -> None:
    db_session.query.return_value.filter.return_value.scalar.return_value = expected_room_guid
    actual_room_guid = read_room_guid_from_room_code(room_code=example_room_code, db_session=db_session)
    assert actual_room_guid == expected_room_guid
