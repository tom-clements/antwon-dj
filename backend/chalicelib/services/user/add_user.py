from chalicelib.data.create_user import create_user
from chalicelib.data.read_user import read_user


def add_user_if_not_exists(user_username: str):
    if not read_user(user_username):
        new_user = create_user(user_username)
        return new_user.user_cognito_guid
