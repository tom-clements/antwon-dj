import json
import logging

import requests

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval
from chalicelib.models.cognito.tokens import TokenDto, CodeTokenDto
from chalicelib.utils.env import AUTH_URL, LOGIN_REDIRECT_ENDPOINT, API_STAGE, API_URL, ENVIRONMENT


def get_cognito_user_info(access_token: str, token_type: str) -> CognitoUserInfoDto:
    url = f"{AUTH_URL}/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}
    user_info = requests.get(url, headers=headers).json()
    logging.info(user_info)
    user_info["email_verified"] = json.loads(user_info["email_verified"])
    return CognitoUserInfoDto(**user_info)


@AwsSecretRetrieval(
    "cognito_client_credentials",
    client_id="local_client_id" if ENVIRONMENT == "local" else "client_id",
    client_secret="local_client_secret" if ENVIRONMENT == "local" else "client_secret",
)
def get_tokens_from_code(client_id: str, client_secret: str, code: str) -> CodeTokenDto:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": f"{API_URL}{api_stage}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    logging.info(params)
    response = requests.post(url, data=params)
    logging.info(response.json())
    return CodeTokenDto(**response.json())


@AwsSecretRetrieval(
    "cognito_client_credentials",
    client_id="local_client_id" if ENVIRONMENT == "local" else "client_id",
    client_secret="local_client_secret" if ENVIRONMENT == "local" else "client_secret",
)
def get_tokens_from_refresh(client_id: str, client_secret: str, refresh_token: str) -> TokenDto:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""

    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": f"{API_URL}{api_stage}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    response = requests.post(url, data=params)
    return TokenDto(**response.json())
