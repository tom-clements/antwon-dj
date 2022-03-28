from functools import wraps
from urllib import request

import jwt

from chalicelib.antwondb.schema import User
from chalicelib.utils.secrets import AwsSecretRetrieval


@AwsSecretRetrieval(
    "antwon-backend",
    backend_app_secret_key="BACKEND_APP_SECRET_KEY",
)
def get_app_secret(backend_app_secret_key: str) -> str:
    return backend_app_secret_key


def authenticate_user(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = kwargs["token"]
        try:
            data = jwt.decode(token, get_app_secret(), algorithms=["HS256"])
            db_session = kwargs["db_session"]
            user = db_session.query(User).filter(User.user_guid == data["user_guid"]).one()
            kwargs["user"] = user
        except jwt.exceptions.DecodeError:
            return {"message": "Token is invalid!"}, 401

        return f(*args, **kwargs)

    return decorated
