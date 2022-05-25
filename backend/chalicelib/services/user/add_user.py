from chalicelib.data.error_handling import UserNotFoundDbError
from chalicelib.data.queries.create_user import create_user
from chalicelib.data.queries.read_user import read_user


def add_user_if_not_exists(user_username: str) -> None:
    try:
        read_user(user_username)
    except UserNotFoundDbError:
        create_user(user_username)
