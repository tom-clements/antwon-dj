from unittest.mock import patch

from chalicelib.data.create_spotify_user import create_spotify_user


@patch("sqlalchemy.orm.session.Session")
def test_add_spotify_user_to_db(mock_db_session):
    user_id = 1
    access_token = "test_access_token"
    refresh_token = "test_refresh_token"
    spotify_user = {"id": "test_username", "display_name": "test_display_name", "images": [{"url": "test_url"}]}
    create_spotify_user(user_id, access_token, refresh_token, spotify_user, db_session=mock_db_session)
    mock_db_session.add.assert_called()
