from dataclasses import asdict
from typing import Dict, List

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.auth.cognito.authorizer import get_authorizer
from chalicelib.services.auth.spotify import app_authorization
from chalicelib.services.spotify.get_playlists import get_playlists_from_username
from chalicelib.services.spotify.store_spotify_user import store_spotify_user
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs
from chalicelib.utils.endpoint_parameter_injection import user_username
from chalicelib.utils.env import BASE_URL

spotify_routes = Blueprint(__name__)


@spotify_routes.route("/user/spotify/connect", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@user_username(spotify_routes)
def spotify_connect_get(username: str) -> Response:
    url = app_authorization() + f"&state={username}"
    return Response(body="", headers={"Location": url}, status_code=302)


@spotify_routes.route("/user/spotify/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(spotify_routes, "code", "state")
def spotify_callback_get(query_params: Dict[str, str]) -> Response:
    store_spotify_user(code=query_params["code"], username=query_params["state"])
    return Response(body="", headers={"Location": BASE_URL}, status_code=302)


@spotify_routes.route("/user/spotify/playlist", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@user_username(spotify_routes)
def get_user_spotify_playlist(username: str) -> List[Dict[str, str]]:
    return [asdict(playlist.simplify()) for playlist in get_playlists_from_username(username=username)]
