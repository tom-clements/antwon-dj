from unittest.mock import patch

from freezegun import freeze_time

from chalicelib.data.create_song import create_song


@freeze_time("2022-01-01")
@patch("sqlalchemy.orm.session.Session")
def test_create_song(mock_db_session):
    test_song = dict(song_uri="test_uri")
    create_song(test_song, db_session=mock_db_session)
    mock_db_session.add.assert_called()
