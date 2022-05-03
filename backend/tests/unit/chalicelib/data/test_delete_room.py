from unittest.mock import patch, Mock

from chalicelib.data.delete_room import db_delete_room


@patch("sqlalchemy.orm.session.Session")
def test_delete_room_from_db(mock_db_session: Mock) -> None:
    db_delete_room("test_guid", db_session=mock_db_session)
    mock_db_session.query.return_value.filter.return_value.delete.assert_called()
