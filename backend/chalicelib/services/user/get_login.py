from chalicelib.services.auth.cognito.endpoints import get_cognito_user_info, get_tokens_from_code
from chalicelib.services.user.add_user import add_user_if_not_exists
from chalicelib.utils.env import API_URL, LOGIN_REDIRECT_ENDPOINT, AUTH_URL, API_STAGE
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


def user_signup_callback(code: str) -> str:
    tokens = get_tokens_from_code(code=code)
    user_info = get_cognito_user_info(tokens.access_token, tokens.token_type)
    add_user_if_not_exists(user_info.username)
    return tokens.refresh_token
