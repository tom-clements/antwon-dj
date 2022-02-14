import uuid
import datetime
import secrets

import jwt
from sqlalchemy.exc import NoResultFound

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import User
from chalicelib.utils.secrets import AwsSecretRetrieval


@AwsSecretRetrieval(
    "antwon-backend",
    backend_app_secret_key="BACKEND_APP_SECRET_KEY",
)
def generate_access_token(user_guid, backend_app_secret_key):
    data = {"user_guid": user_guid, "exp": datetime.datetime.now() + datetime.timedelta(days=1)}
    return jwt.encode(data, backend_app_secret_key, algorithm="HS256")


def generate_refresh_token():
    refresh_token = secrets.token_hex(32)
    return refresh_token


@db.use_db_session(commit=True)
def store_refresh_token(refresh_token, user_guid, db_session):
    db_session.query(User).filter(User.user_guid == user_guid).update(
        {User.refresh_token: refresh_token}, synchronize_session=False
    )


@db.use_db_session(commit=True)
def store_access_token(access_token, user_guid, db_session):
    db_session.query(User).filter(User.user_guid == user_guid).update(
        {User.access_token: access_token}, synchronize_session=False
    )


def generate_guest_token():
    return generate_access_token(uuid.uuid4())


@db.use_db_session(commit=True)
def add_new_user(username, password, db_session):
    new_user = User(
        user_guuid=str(uuid.uuid4()), username=username, password=password, create_time=datetime.datetime.now()
    )
    db_session.add(new_user)
    return new_user.user_guid


def generate_user_tokens(user_guid):
    access_token = generate_access_token(user_guid)
    refresh_token = generate_refresh_token()
    store_access_token(access_token, user_guid)
    store_refresh_token(refresh_token, user_guid)
    return access_token, refresh_token, 200


@db.use_db_session()
def obtain_user_tokens(username, password, db_session):
    try:
        user = db_session.query(User.user_guid).filter(User.user_name == username, User.password == password).scalar()
        access_token = user.access_token
        refresh_token = user.refresh_token
        return access_token, refresh_token, 200
    except NoResultFound:
        return "", "", 401


@db.use_db_session()
def new_access_token_from_refresh_token(refresh_token, db_session):
    user_guid = db_session.query(User.user_guid).filter(User.refresh_token == refresh_token).scalar()
    access_token = generate_access_token(user_guid)
    return access_token, 200
