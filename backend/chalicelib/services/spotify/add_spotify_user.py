from typing import Any, Dict

from sqlalchemy.orm import session

from chalicelib.data.create_spotify_user import create_spotify_user
from chalicelib.data.is_exists import is_spotify_user_exists
from chalicelib.data.read_scalar_queries import get_user_id_from_username
from chalicelib.data.update_spotify_user import update_spotify_user
from chalicelib.services.auth import db


# TODO test this
@db.use_db_session(commit=True)
def add_spotify_user(
    username: str, access_token: str, refresh_token: str, spotify_user: Dict[str, Any], db_session: session
):
    user_id = get_user_id_from_username(username)
    if not is_spotify_user_exists(user_id):
        create_spotify_user(user_id, access_token, refresh_token, spotify_user)
    # TODO: this shouldn't need to be handled, this is just to refresh tokens manually to aid development
    else:
        update_spotify_user(user_id, access_token, refresh_token)
