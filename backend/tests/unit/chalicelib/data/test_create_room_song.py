from unittest.mock import patch, Mock

from freezegun import freeze_time

from chalicelib.data.queries.queue.create_room_song import create_room_song
from chalicelib.models import Song


@freeze_time("2022-01-01")
@patch("sqlalchemy.orm.session.Session")
def test_add_to_db_queue(mock_db_session: Mock) -> None:
    new_song = Song(song_id=1)
    room_id = 1
    create_room_song(room_id, new_song, db_session=mock_db_session)
    mock_db_session.add.assert_called()
