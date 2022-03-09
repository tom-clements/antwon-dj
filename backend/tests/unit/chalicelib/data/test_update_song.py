import datetime
from unittest.mock import patch

from freezegun import freeze_time

from chalicelib.data.update_song import update_song


def uuid_mock():
    return "test_uuid"


@freeze_time("2022-01-01")
@patch("sqlalchemy.orm.session.Session")
def test_update_song(mock_db_session):
    test_add_data = {
        "song_guid": uuid_mock(),
        "song_uri": "test_uri",
        "insert_time": datetime.datetime.now(),
        "last_accessed": datetime.datetime.now(),
    }
    with patch("uuid.uuid4", uuid_mock):
        update_song(test_add_data, db_session=mock_db_session)
    mock_db_session.query.return_value.filter.return_value.update.assert_called_with(
        test_add_data, synchronize_session=False
    )
