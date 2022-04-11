from typing import Dict

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.user.get_login import user_login, user_signup_callback
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=get_cors_config())
def get_login() -> Response:
    state = None
    if user_routes.current_request.query_params and ("state" in user_routes.current_request.query_params):
        state = user_routes.current_request.query_params["state"]
    return user_login(state=state)


@user_routes.route("/login/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(user_routes, "username")
def get_signup_callback(query_params: Dict[str, str]) -> Response:
    spotify_login = False
    if ("state" in query_params) and query_params["state"] == "spotify":
        spotify_login = True
    return user_signup_callback(code=query_params["code"], spotify_login=spotify_login)
