import datetime
from dataclasses import asdict
from unittest.mock import patch, Mock

from freezegun import freeze_time

from chalicelib.data.queue.create_song import create_song
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_track_formatted


@freeze_time("2022-01-01")
@patch("uuid.uuid4")
@patch("sqlalchemy.orm.session.Session")
@patch("chalicelib.data.queue.create_song.Song")
def test_create_song(mock_song: Mock, mock_db_session: Mock, mock_uuid4: Mock) -> None:
    mock_uuid4.return_value = "mock_uuid"
    song = get_example_track_formatted()
    create_song(song, db_session=mock_db_session)
    mock_uuid4.assert_called_once()
    mock_song.assert_called_once_with(
        song_guid="mock_uuid",
        insert_time=datetime.datetime.now(),
        last_accessed=datetime.datetime.now(),
        **asdict(song)
    )
    mock_db_session.add.assert_called_once()
