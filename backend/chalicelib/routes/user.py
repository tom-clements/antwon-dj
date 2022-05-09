from dataclasses import asdict
from typing import Dict

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.auth.cognito.authorizer import get_authorizer
from chalicelib.services.auth.cognito.endpoints import get_tokens_from_refresh, get_cognito_user_info
from chalicelib.services.user.get_login import user_login, user_signup_callback
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs, verify_post_input
from chalicelib.utils.endpoint_parameter_injection import user_auth_token
from chalicelib.utils.env import BASE_URL

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=get_cors_config())
def get_login() -> Response:
    url = user_login()
    return Response(body="", headers={"Location": url}, status_code=302)


@user_routes.route("/login/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(user_routes, "code")
def get_signup_callback(query_params: Dict[str, str]) -> Response:
    refresh_token = user_signup_callback(code=query_params["code"])
    return Response(
        body="",
        headers={"Location": BASE_URL, "Set-Cookie": f"refresh-token={refresh_token};Path=/;HttpOnly"},
        status_code=302,
    )


@user_routes.route("/user/token", methods=["POST"], cors=get_cors_config())
@verify_post_input(user_routes, "refresh_token")
def get_user_token(post_body: Dict[str, str]) -> Dict[str, str]:
    tokens = get_tokens_from_refresh(refresh_token=post_body["refresh_token"])
    return asdict(tokens)


@user_routes.route("/user/info", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@user_auth_token(user_routes)
def get_user_info(token: str, token_type: str) -> Dict[str, str]:
    user_info = get_cognito_user_info(access_token=token, token_type=token_type)
    return asdict(user_info)
