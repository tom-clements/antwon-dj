import datetime

import requests
from chalice import Response

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import User
from chalicelib.utils.chalice import get_auth_url, get_api_url
from chalicelib.utils.secrets import AwsSecretRetrieval


@db.use_db_session(commit=True)
def add_new_user(user_cognito_guid, db_session):
    if not db_session.query(User).filter(User.user_cognito_guid == user_cognito_guid).scalar():
        new_user = User(user_cognito_guid=user_cognito_guid, create_time=datetime.datetime.now())
        db_session.add(new_user)
        return new_user.user_cognito_guid


def get_user_guid_from_token(access_token, token_type):
    url = f"{get_auth_url()}/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}
    response = requests.get(url, headers=headers)
    return response.json()["sub"]


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id", client_secret="client_secret")
def get_tokens(client_id, client_secret, code):
    url = f"{get_auth_url()}/oauth2/token"
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": "https://api.djantwon.com/dev/callback",
    }
    response = requests.post(url, data=params)
    return response.json()


def redirect_to_spotify_connect(user_cognito_guid):
    url = f"{get_api_url()}/spotifyConnect?" + f"user_guid={user_cognito_guid}"
    return Response(body="", headers={"Location": url}, status_code=302)


def redirect_to_client_with_tokens(tokens):
    url = "https://www.djantwon.com/?" + "&".join([f"{k}={v}" for k, v in tokens.items()])
    return Response(body="", headers={"Location": url}, status_code=302)
