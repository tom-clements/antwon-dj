from unittest.mock import patch, Mock

from chalicelib.data.queries.queue.create_like import create_like


@patch("sqlalchemy.orm.session.Session")
def test_create_like(mock_db_session: Mock) -> None:
    create_like(1, 1, db_session=mock_db_session)
    mock_db_session.add.assert_called()
