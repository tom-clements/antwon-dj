from chalice import Blueprint

from chalicelib.endpoints.user.core import (
    generate_guest_token,
    generate_user_tokens,
    obtain_user_tokens,
    new_access_token_from_refresh_token,
    add_new_user,
)

user_routes = Blueprint(__name__)


@user_routes.route("/userGuestToken", methods=["GET"], cors=True)
def get_user_guest_token():
    access_token = generate_guest_token()
    return {"token": access_token}


@user_routes.route("/userSignUp", methods=["POST"], cors=True)
def post_user_sign_up():
    body = user_routes.current_request.json_body
    user_guid = add_new_user(body["user_name"], body["password"])
    access_token, refresh_token = generate_user_tokens(user_guid)
    return {"access_token": access_token, "refresh_token": refresh_token}


@user_routes.route("/userLogin", methods=["POST"], cors=True)
def post_user_login():
    body = user_routes.current_request.json_body
    access_token, refresh_token = obtain_user_tokens(body["user_name"], body["password"])
    return {"access_token": access_token, "refresh_token": refresh_token}


@user_routes.route("/userRefreshToken", methods=["POST"], cors=True)
def post_user_refresh_token():
    body = user_routes.current_request.json_body
    access_token, refresh_token = new_access_token_from_refresh_token(body["refresh_token"])
    return {"access_token": access_token, "refresh_token": refresh_token}
