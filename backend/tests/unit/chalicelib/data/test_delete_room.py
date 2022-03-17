from unittest.mock import patch

from chalicelib.data.delete_room import delete_room


@patch("sqlalchemy.orm.session.Session")
def test_delete_room_from_db(mock_db_session):
    delete_room("test_guid", db_session=mock_db_session)
    mock_db_session.query.return_value.filter.return_value.delete.assert_called()
