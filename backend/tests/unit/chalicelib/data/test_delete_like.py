from unittest.mock import patch

from chalicelib.data.delete_like import delete_like


@patch("sqlalchemy.orm.session.Session")
def test_delete_like(mock_db_session):
    delete_like(1, 1, db_session=mock_db_session)
    mock_db_session.query.return_value.filter.return_value.delete.assert_called()
