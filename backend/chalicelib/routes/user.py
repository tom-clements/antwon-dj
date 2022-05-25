from dataclasses import asdict
from typing import Dict

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.endpoints.user_info import UserInfoDto
from chalicelib.authorizer import get_authorizer
from chalicelib.services.auth.endpoints import (
    cognito_tokens_refresh_token_request,
    cognito_logout_url,
    cognito_login_url,
)
from chalicelib.services.user.get_login import user_signup_callback
from chalicelib.services.user.get_user_info import get_room_code_from_username
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs, verify_post_input
from chalicelib.utils.endpoint_parameter_injection import inject_cognito_user_info
from chalicelib.utils.env import BASE_URL

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=get_cors_config())
def login_get() -> Response:
    url = cognito_login_url()
    return Response(body="", headers={"Location": url}, status_code=302)


@user_routes.route("/logout", methods=["GET"], cors=get_cors_config())
def logout_get() -> Response:
    url = cognito_logout_url()
    return Response(body="", headers={"Location": url}, status_code=302)


@user_routes.route("/logout/callback", methods=["GET"], cors=get_cors_config())
def login_callback_get() -> Response:
    return Response(
        body="",
        headers={"Location": f"{BASE_URL}/logout", "Set-Cookie": "refresh-token='';expires=0;Path=/;HttpOnly"},
        status_code=302,
    )


@user_routes.route("/login/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(user_routes, "code")
def signup_callback_get(query_params: Dict[str, str]) -> Response:
    refresh_token = user_signup_callback(code=query_params["code"])
    return Response(
        body="",
        headers={"Location": f"{BASE_URL}/login", "Set-Cookie": f"refresh-token={refresh_token};Path=/;HttpOnly"},
        status_code=302,
    )


@user_routes.route("/user/token", methods=["POST"], cors=get_cors_config())
@verify_post_input(user_routes, "refresh_token")
def user_token_get(post_body: Dict[str, str]) -> Dict[str, str]:
    tokens = cognito_tokens_refresh_token_request(refresh_token=post_body["refresh_token"])
    return asdict(tokens)


@user_routes.route("/user/info", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@inject_cognito_user_info(user_routes)
def user_info_get(user_info: CognitoUserInfoDto) -> Dict[str, str]:
    room_code = get_room_code_from_username(user_info.username)
    return asdict(UserInfoDto(room_code=room_code, **asdict(user_info)))
