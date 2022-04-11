from dataclasses import asdict
from typing import Dict, List

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.spotify.add_spotify_user import add_spotify_user
from chalicelib.services.spotify.get_current_playing import get_currently_playing
from chalicelib.services.spotify.get_search_songs import search_songs
from chalicelib.services.auth import spotify
from chalicelib.services.auth.spotify import get_token
from chalicelib.utils.endpoint_input_validation import verify_parameter_inputs
from chalicelib.utils.env import BASE_URL

spotify_routes = Blueprint(__name__)


@spotify_routes.route("/user/spotify/connect", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(spotify_routes, "username")
def spotify_connect_get(query_params: Dict[str, str]) -> Response:
    url = spotify.app_authorization() + "&state=" + query_params["username"]
    return Response(body="", headers={"Location": url}, status_code=302)


@spotify_routes.route("/room/{room_guid}/search", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(spotify_routes, "query")
def spotify_search_get(room_guid: str, query_params: Dict[str, str]) -> Dict[str, List[Dict[str, str]]]:
    songs = search_songs(song_query=query_params["query"], room_guid=room_guid)
    return {"songs": [asdict(song) for song in songs]}


@spotify_routes.route("/user/spotify/callback", methods=["GET"], cors=get_cors_config())
@verify_parameter_inputs(spotify_routes, "code", "state")
def spotify_callback_get(query_params: Dict[str, str]) -> Response:
    token = get_token(code=query_params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(query_params["state"], token["access_token"], token["refresh_token"], spotify_user)
    return Response(body="", headers={"Location": BASE_URL}, status_code=302)


@spotify_routes.route("/room/{room_guid}/playing", methods=["GET"], cors=get_cors_config())
def spotify_currently_playing_get(room_guid: str) -> Dict[str, Dict[str, str]]:
    return {"song": asdict(get_currently_playing(room_guid=room_guid))}
