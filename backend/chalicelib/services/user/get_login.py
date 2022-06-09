from chalicelib.services.auth.endpoints import cognito_user_info_request, cognito_tokens_code_request
from chalicelib.services.user.add_user import add_user_if_not_exists


def user_signup_callback(code: str) -> str:
    tokens = cognito_tokens_code_request(code=code)
    user_info = cognito_user_info_request(tokens.access_token, tokens.token_type)
    add_user_if_not_exists(user_info.username, tokens.id_token)
    return tokens.refresh_token
