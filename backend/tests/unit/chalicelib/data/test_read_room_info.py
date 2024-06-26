from dataclasses import asdict
from unittest.mock import patch, Mock

from chalicelib.data.queries.read_room_info import read_spotify_room_info
from chalicelib.models.data_queries.room_info import SpotifyRoomInfo


@patch("sqlalchemy.orm.session.Session")
def test_read_spotify_room_info(mock_db_session: Mock) -> None:
    expected = SpotifyRoomInfo(room_code="test_code", spotify_user_username="test_name")
    db_query = mock_db_session.query.return_value.select_from.return_value.join.return_value.join.return_value.filter
    db_query.return_value.one.return_value = asdict(expected)
    actual = read_spotify_room_info("test_room_guid", db_session=mock_db_session)
    db_query.return_value.one.assert_called()
    assert actual == expected
