from chalicelib.data.error_handling import UserNotFoundDbError
from chalicelib.data.queries.create_user import create_user
from chalicelib.data.queries.read_user import read_user
from chalicelib.data.queries.update_user_id_token import update_user_id_token


def add_user_if_not_exists(user_username: str, id_token: str) -> None:
    try:
        read_user(user_username)
        update_user_id_token(user_username, id_token)
    except UserNotFoundDbError:
        create_user(user_username, id_token)
