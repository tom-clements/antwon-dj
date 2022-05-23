from unittest.mock import patch, Mock

from chalicelib.data.queries.queue.delete_room_songs import delete_room_songs


@patch("sqlalchemy.orm.session.Session")
def test_delete_room_songs_from_db(mock_db_session: Mock) -> None:
    delete_room_songs("test_guid", db_session=mock_db_session)
    mock_db_session.query.return_value.join.return_value.filter.return_value.delete.assert_called()
