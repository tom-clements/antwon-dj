from typing import Dict

from chalicelib.services.auth.cognito import get_username_from_token, get_tokens
from chalicelib.services.user.add_user import add_user_if_not_exists
from chalicelib.utils.env import API_URL, LOGIN_REDIRECT_ENDPOINT, AUTH_URL, BASE_URL, API_STAGE
from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id")
def user_login(client_id: str) -> str:
    params = {
        "client_id": client_id,
        "response_type": "code",
        "scope": "aws.cognito.signin.user.admin+email+openid+profile",
        "redirect_uri": f"{API_URL}/{API_STAGE}/{LOGIN_REDIRECT_ENDPOINT}",
    }
    query = "&".join([f"{k}={v}" for k, v in params.items()])
    return f"{AUTH_URL}/login?" + query


def redirect_to_spotify_connect(username: str) -> str:
    return f"{API_URL}/{API_STAGE}/user/spotify/connect?" + f"username={username}"


def redirect_to_client_with_tokens(tokens: Dict[str, str]) -> str:
    return f"{BASE_URL}/?" + "&".join([f"{k}={v}" for k, v in tokens.items()])


def user_signup_callback(code: str) -> str:
    tokens = get_tokens(code=code)
    username = get_username_from_token(tokens["access_token"], tokens["token_type"])
    add_user_if_not_exists(username)
    return redirect_to_client_with_tokens(tokens)
