from chalice import Blueprint, Response

from chalicelib.endpoints.user.core import (
    add_new_user,
    get_user_guid_from_token,
    get_tokens,
    redirect_to_spotify_connect,
    redirect_to_client_with_tokens,
)
from chalicelib.utils.chalice import get_auth_url

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=True)
def user_login():
    params = {
        "client_id": "1aqt0nm5tdma1rf7ujr58ses6q",
        "response_type": "code",
        "scope": "aws.cognito.signin.user.admin+email+openid+profile",
        "redirect_uri": "https://api.djantwon.com/dev/callback",
    }
    if user_routes.current_request.query_params and ("state" in user_routes.current_request.query_params):
        params.update({"state": user_routes.current_request.query_params["state"]})
    query = "&".join([f"{k}={v}" for k, v in params.items()])
    url = f"{get_auth_url()}/login?" + query
    return Response(body="", headers={"Location": url}, status_code=302)


@user_routes.route("/callback", methods=["GET"], cors=True)
def user_signup_callback():
    params = user_routes.current_request.query_params
    tokens = get_tokens(code=params["code"])
    user_cognito_guid = get_user_guid_from_token(tokens["access_token"], tokens["token_type"])
    add_new_user(user_cognito_guid)
    if ("state" in user_routes.current_request.query_params) and (
        user_routes.current_request.query_params["state"] == "spotify"
    ):
        return redirect_to_spotify_connect(user_cognito_guid)
    else:
        return redirect_to_client_with_tokens(tokens)
