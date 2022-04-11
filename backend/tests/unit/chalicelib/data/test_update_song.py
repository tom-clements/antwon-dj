import datetime
from unittest.mock import patch, Mock

from freezegun import freeze_time

from chalicelib.data.update_song import update_song


@freeze_time("2022-01-01")
@patch("sqlalchemy.orm.session.Session")
@patch("uuid.uuid4")
def test_update_song(mock_uuid: Mock, mock_db_session: Mock) -> None:
    mock_uuid.return_value = "mock_uuid"
    test_add_data = {
        "song_guid": "mock_uuid",
        "song_uri": "test_uri",
        "insert_time": datetime.datetime.now(),
        "last_accessed": datetime.datetime.now(),
    }
    update_song(test_add_data, db_session=mock_db_session)
    mock_db_session.query.return_value.filter.return_value.update.assert_called_with(
        test_add_data, synchronize_session=False
    )
