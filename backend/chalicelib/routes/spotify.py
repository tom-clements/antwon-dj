from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.services.spotify.add_spotify_user import add_spotify_user
from chalicelib.services.spotify.get_current_playing import get_currently_playing
from chalicelib.services.spotify.get_search_songs import search_songs
from chalicelib.services.auth import spotify
from chalicelib.services.auth.spotify import get_token
from chalicelib.utils.env import BASE_URL

spotify_routes = Blueprint(__name__)


@spotify_routes.route("/user/spotify/connect", methods=["GET"], cors=get_cors_config())
def spotify_connect_get():
    username = spotify_routes.current_request.query_params["username"]
    url = spotify.app_authorization() + "&state=" + str(username)
    return Response(body="", headers={"Location": url}, status_code=302)


@spotify_routes.route("/room/{room_guid}/search", methods=["GET"], cors=get_cors_config())
def spotify_search_get(room_guid):
    params = spotify_routes.current_request.query_params
    search_result = search_songs(song_query=params["query"], room_guid=room_guid)
    return {"songs": search_result}


@spotify_routes.route("/user/spotify/callback", methods=["GET"], cors=get_cors_config())
def spotify_callback_get():
    params = spotify_routes.current_request.query_params
    token = get_token(code=params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(params["state"], token["access_token"], token["refresh_token"], spotify_user)
    return Response(body="", headers={"Location": BASE_URL}, status_code=302)


@spotify_routes.route("/room/{room_guid}/playing", methods=["GET"], cors=get_cors_config())
def spotify_currently_playing_get(room_guid):
    song = get_currently_playing(room_guid=room_guid)
    return {"song": song}
