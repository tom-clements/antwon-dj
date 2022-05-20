import json

import requests

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval
from chalicelib.models.cognito.tokens import TokenDto, CodeTokenDto
from chalicelib.utils.env import AUTH_URL, LOGIN_REDIRECT_ENDPOINT, API_STAGE, API_URL


def get_cognito_user_info(access_token: str, token_type: str) -> CognitoUserInfoDto:
    url = f"{AUTH_URL}/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}
    user_info = requests.get(url, headers=headers).json()
    user_info["email_verified"] = json.loads(user_info["email_verified"])
    return CognitoUserInfoDto(**user_info)


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id", client_secret="client_secret")
def get_tokens_from_code(client_id: str, client_secret: str, code: str) -> CodeTokenDto:
    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": f"{API_URL}/{API_STAGE}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    response = requests.post(url, data=params)
    return CodeTokenDto(**response.json())


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id", client_secret="client_secret")
def get_tokens_from_refresh(client_id: str, client_secret: str, refresh_token: str) -> TokenDto:
    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": f"{API_URL}/{API_STAGE}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    response = requests.post(url, data=params)
    return TokenDto(**response.json())
