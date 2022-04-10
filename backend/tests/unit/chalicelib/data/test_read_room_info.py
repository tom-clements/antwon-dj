from unittest.mock import patch

from chalicelib.data.read_room_info import read_room_info


@patch("sqlalchemy.orm.session.Session")
def test_get_room_info(mock_db_session):
    read_room_info("test_room_guid", db_session=mock_db_session)
    db_filter = mock_db_session.query.return_value.select_from.return_value.join.return_value.join.return_value.filter
    db_filter.return_value.one.assert_called()
