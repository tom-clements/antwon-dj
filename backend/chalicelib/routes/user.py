from typing import Dict

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.user.get_login import user_login, user_signup_callback
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=get_cors_config())
def get_login() -> Response:
    url = user_login()
    return Response(body="", headers={"Location": url}, status_code=302)


@user_routes.route("/login/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(user_routes, "username")
def get_signup_callback(query_params: Dict[str, str]) -> Response:
    url = user_signup_callback(code=query_params["code"])
    return Response(body="", headers={"Location": url}, status_code=302)
