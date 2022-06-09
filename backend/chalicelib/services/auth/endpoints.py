import json

import requests

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.utils.aws_secrets import AwsSecretRetrieval
from chalicelib.models.cognito.tokens import TokenDto, CodeTokenDto
from chalicelib.utils.env import (
    AUTH_URL,
    LOGIN_REDIRECT_ENDPOINT,
    LOGOUT_REDIRECT_ENDPOINT,
    API_STAGE,
    API_URL,
    ENVIRONMENT,
)


@AwsSecretRetrieval(
    "cognito_client_credentials", client_id="local_client_id" if ENVIRONMENT == "local" else "client_id"
)
def cognito_login_url(client_id: str) -> str:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    params = {
        "client_id": client_id,
        "response_type": "code",
        "scope": "aws.cognito.signin.user.admin+email+openid+profile",
        "redirect_uri": f"{API_URL}{api_stage}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    query = "&".join([f"{k}={v}" for k, v in params.items()])
    return f"{AUTH_URL}/login?" + query


@AwsSecretRetrieval(
    "cognito_client_credentials",
    client_id="local_client_id" if ENVIRONMENT == "local" else "client_id",
)
def cognito_logout_url(client_id: str) -> str:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    params = {
        "client_id": client_id,
        "redirect_uri": f"{API_URL}{api_stage}/{LOGOUT_REDIRECT_ENDPOINT}",
    }
    query = "&".join([f"{k}={v}" for k, v in params.items()])
    return f"{AUTH_URL}/logout?" + query


def cognito_user_info_request(access_token: str, token_type: str) -> CognitoUserInfoDto:
    url = f"{AUTH_URL}/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}
    user_info = requests.get(url, headers=headers).json()
    user_info["email_verified"] = json.loads(user_info["email_verified"])
    return CognitoUserInfoDto(**user_info)


@AwsSecretRetrieval(
    "cognito_client_credentials",
    client_id="local_client_id" if ENVIRONMENT == "local" else "client_id",
    client_secret="local_client_secret" if ENVIRONMENT == "local" else "client_secret",
)
def cognito_tokens_code_request(client_id: str, client_secret: str, code: str) -> CodeTokenDto:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": f"{API_URL}{api_stage}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    response = requests.post(url, data=params)
    return CodeTokenDto(**response.json())


@AwsSecretRetrieval(
    "cognito_client_credentials",
    client_id="local_client_id" if ENVIRONMENT == "local" else "client_id",
    client_secret="local_client_secret" if ENVIRONMENT == "local" else "client_secret",
)
def cognito_tokens_refresh_token_request(client_id: str, client_secret: str, refresh_token: str) -> TokenDto:
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
