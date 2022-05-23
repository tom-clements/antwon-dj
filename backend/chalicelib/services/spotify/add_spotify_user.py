from typing import Any, Dict

from sqlalchemy.orm import Session

from chalicelib.data.queries.create_spotify_user import create_spotify_user
from chalicelib.data.queries.is_exists import is_spotify_user_exists
from chalicelib.data.queries.read_scalar_queries import read_user_id_from_username
from chalicelib.data import db
from chalicelib.services.exceptions import SpotifyUserExistsServiceError


@db.use_db_session(commit=True)
def add_spotify_user(
    username: str, access_token: str, refresh_token: str, spotify_user: Dict[str, Any], db_session: Session
) -> None:
    user_id = read_user_id_from_username(username)
    if is_spotify_user_exists(user_id):
        raise SpotifyUserExistsServiceError(username)
    else:
        create_spotify_user(user_id, access_token, refresh_token, spotify_user)
