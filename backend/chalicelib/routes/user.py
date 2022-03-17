from chalice import Blueprint
from chalicelib.services.user.get_login import user_login, user_signup_callback

user_routes = Blueprint(__name__)


@user_routes.route("/login", methods=["GET"], cors=True)
def get_login():
    state = None
    if user_routes.current_request.query_params and ("state" in user_routes.current_request.query_params):
        state = user_routes.current_request.query_params["state"]
    return user_login(state=state)


@user_routes.route("/login/callback", methods=["GET"], cors=True)
def get_signup_callback():
    params = user_routes.current_request.query_params
    spotify_login = False
    if ("state" in user_routes.current_request.query_params) and (
        user_routes.current_request.query_params["state"] == "spotify"
    ):
        spotify_login = True
    return user_signup_callback(code=params["code"], spotify_login=spotify_login)
