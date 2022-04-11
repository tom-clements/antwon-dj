from unittest.mock import patch, Mock

from chalicelib.data.create_room import create_room


@patch("sqlalchemy.orm.session.Session")
def test_create_room(mock_db_session: Mock) -> None:
    create_room("AAAAAAA", 1, db_session=mock_db_session)
    mock_db_session.add.assert_called()
