from typing import Dict

from chalice import Response

from chalicelib.services.auth.cognito import get_username_from_token, get_tokens
from chalicelib.services.user.add_user import add_user_if_not_exists
from chalicelib.utils.env import API_URL, LOGIN_REDIRECT_URL, AUTH_URL, BASE_URL, API_STAGE
from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval


@AwsSecretRetrieval("cognito_client_credentials", client_id="client_id")
def user_login(client_id: str, state=None) -> Response:
    params = {
        "client_id": client_id,
        "response_type": "code",
        "scope": "aws.cognito.signin.user.admin+email+openid+profile",
        "redirect_uri": LOGIN_REDIRECT_URL,
    }
    if state:
        params.update({"state": state})
    query = "&".join([f"{k}={v}" for k, v in params.items()])
    url = f"{AUTH_URL}/login?" + query
    return Response(body="", headers={"Location": url}, status_code=302)


def redirect_to_spotify_connect(username: str) -> Response:
    url = f"{API_URL}/{API_STAGE}/user/spotify/connect?" + f"username={username}"
    return Response(body="", headers={"Location": url}, status_code=302)


def redirect_to_client_with_tokens(tokens: Dict[str, str]) -> Response:
    url = f"{BASE_URL}/?" + "&".join([f"{k}={v}" for k, v in tokens.items()])
    return Response(body="", headers={"Location": url}, status_code=302)


def user_signup_callback(code: str, spotify_login: bool) -> Response:
    tokens = get_tokens(code=code)
    username = get_username_from_token(tokens["access_token"], tokens["token_type"])
    add_user_if_not_exists(username)
    if spotify_login:
        return redirect_to_spotify_connect(username)
    else:
        return redirect_to_client_with_tokens(tokens)
