from collections import namedtuple
from unittest.mock import patch, Mock

import pytest

from chalicelib.data.queue.read_room_queue import (
    read_room_queue_guest,
    read_room_queue_user,
    read_queue_column_query,
    read_is_user_liked_query,
    read_song_likes_query,
    read_room_queue_query,
    read_last_five_played_tracked,
)
from tests.unit.fixtures.queue import QueueResult


@patch("sqlalchemy.orm.session.Session")
@patch("chalicelib.data.queue.read_room_queue.Query")
def test_read_room_queue_query(mock_query: Mock, mock_db_session: Mock) -> None:
    room_guid = "room_guid"
    mock_db_session.query.return_value.join.return_value.join.return_value.filter.return_value.subquery.return_value = (
        mock_query()
    )
    actual = read_room_queue_query(room_guid=room_guid, db_session=mock_db_session)
    # TODO add assert called withs
    assert actual == mock_query()


@patch("sqlalchemy.orm.session.Session")
@patch("chalicelib.data.queue.read_room_queue.Query")
def test_read_song_likes_query(mock_query: Mock, mock_db_session: Mock) -> None:
    room_guid = "room_guid"
    mock_db_session.query.return_value.group_by.return_value.subquery.return_value = mock_query()
    actual = read_song_likes_query(room_guid=room_guid, db_session=mock_db_session)
    # TODO add assert called withs
    assert actual == mock_query()


@patch("sqlalchemy.orm.session.Session")
@patch("chalicelib.data.queue.read_room_queue.Query")
def test_read_is_user_liked_query(mock_query: Mock, mock_db_session: Mock) -> None:
    room_guid = "room_guid"
    user_id = 1
    mock_db_session.query.return_value.filter.return_value.subquery.return_value = mock_query()
    actual = read_is_user_liked_query(user_id=user_id, room_guid=room_guid, db_session=mock_db_session)
    # TODO add assert called withs
    assert actual == mock_query()


@patch("chalicelib.data.queue.read_room_queue.read_room_queue_query")
@patch("chalicelib.data.queue.read_room_queue.read_song_likes_query")
@patch("sqlalchemy.orm.session.Session")
@patch("chalicelib.data.queue.read_room_queue.Query")
def test_read_queue_column_query(
    mock_query: Mock,
    mock_db_session: Mock,
    mock_read_song_likes_query: Mock,
    mock_read_room_queue_query: Mock,
) -> None:
    room_guid = "room_guid"
    mock_read_room_queue_query.return_value = mock_query
    mock_read_song_likes_query.return_value = mock_query
    mock_db_session.query.return_value.select_from.return_value.join.return_value.order_by.return_value = mock_query

    actual = read_queue_column_query(room_guid=room_guid, db_session=mock_db_session)
    assert actual == mock_query
    mock_read_room_queue_query.assert_called_once_with(room_guid=room_guid)
    mock_read_song_likes_query.assert_called_once_with(room_guid=room_guid)
    mock_db_session.query.assert_called_once()


@pytest.mark.parametrize(
    "queue",
    [
        (pytest.lazy_fixture("guest_queue")),  # type: ignore
    ],
)
@patch("chalicelib.data.queue.read_room_queue.read_queue_column_query")
@patch("chalicelib.data.queue.read_room_queue.QUEUE_COLS_GUEST")
def test_read_room_queue_guest(
    mock_queue_cols_guest: Mock,
    mock_read_queue_column_query: Mock,
    queue: QueueResult,
) -> None:
    room_guid = "room_guid"
    mock_read_queue_column_query.return_value.all.return_value = [q.db_result for q in queue.songs]

    actual_queue = read_room_queue_guest(room_guid=room_guid)
    mock_read_queue_column_query.assert_called_with(room_guid=room_guid, cols=mock_queue_cols_guest)
    mock_read_queue_column_query.return_value.all.assert_called_once()

    assert actual_queue == [q.result for q in queue.songs]


@pytest.mark.parametrize(
    "queue",
    [
        (pytest.lazy_fixture("user_queue")),  # type: ignore
    ],
)
@patch("chalicelib.data.queue.read_room_queue.read_is_user_liked_query")
@patch("chalicelib.data.queue.read_room_queue.read_queue_column_query")
@patch("chalicelib.data.queue.read_room_queue.Query")
@patch("chalicelib.data.queue.read_room_queue.QUEUE_COLS_USER")
def test_read_room_queue_user(
    mock_queue_cols_user: Mock,
    mock_sql_query: Mock,
    mock_read_queue_column_query: Mock,
    mock_read_is_user_liked_query: Mock,
    queue: QueueResult,
) -> None:
    room_guid = "room_guid"
    user_id = 1
    mock_read_is_user_liked_query.return_value = mock_sql_query()
    mock_read_queue_column_query.return_value.join.return_value.all.return_value = [q.db_result for q in queue.songs]

    actual_queue = read_room_queue_user(room_guid=room_guid, user_id=user_id)
    mock_read_is_user_liked_query.assert_called_with(user_id, room_guid=room_guid)
    mock_read_queue_column_query.assert_called_with(room_guid=room_guid, cols=mock_queue_cols_user)
    mock_read_queue_column_query.return_value.join.assert_called_with(mock_sql_query(), isouter=True)
    mock_read_queue_column_query.return_value.join.return_value.all.assert_called_once()

    assert actual_queue == [q.result for q in queue.songs]


@patch("sqlalchemy.orm.session.Session")
def test_read_last_five_played_tracked(mock_db_session: Mock) -> None:
    row = namedtuple("row", "song_uri")
    song_uris = ["song_uri1", "song_uri2", "song_uri3", "song_uri4", "song_uri5"]
    last_five_tracks = [row(song_uri) for song_uri in song_uris]
    room_guid = "room_guid"
    filter_query = mock_db_session.query.return_value.join.return_value.join.return_value.filter.return_value
    filter_query.order_by.return_value.limit.return_value.all.return_value = last_five_tracks
    actual = read_last_five_played_tracked(room_guid=room_guid, db_session=mock_db_session)
    # TODO add assert called withs
    assert actual == song_uris
