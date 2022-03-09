from unittest.mock import patch

from chalicelib.data.create_like import create_like


@patch("sqlalchemy.orm.session.Session")
def test_create_like(mock_db_session):
    create_like(1, 1, db_session=mock_db_session)
    mock_db_session.add.assert_called()
