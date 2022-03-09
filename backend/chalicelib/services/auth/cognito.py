from typing import Dict

import requests
from chalice import CognitoUserPoolAuthorizer

from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval
from chalicelib.utils.env import AUTH_URL, LOGIN_REDIRECT_URL


def get_authorizer(scopes=None):
    if scopes is None:
        scopes = ["email", "openid", "profile"]
    return CognitoUserPoolAuthorizer(
        name="antwon_user_pool",
        provider_arns=["arn:aws:cognito-idp:eu-west-2:303078101535:userpool/eu-west-2_Y4hA2uEzU"],
        scopes=scopes,
    )


def get_username_from_token(access_token, token_type) -> str:
    url = f"{AUTH_URL}/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}
    response = requests.get(url, headers=headers)
    return response.json()["username"]


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id", client_secret="client_secret")
def get_tokens(client_id: str, client_secret: str, code: str) -> Dict[str, str]:
    url = f"{AUTH_URL}/oauth2/token"
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": LOGIN_REDIRECT_URL,
    }
    response = requests.post(url, data=params)
    return response.json()
