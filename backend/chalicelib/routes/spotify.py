from chalice import Blueprint, Response

from chalicelib.services.spotify.add_spotify_user import add_spotify_user
from chalicelib.services.spotify.add_to_playlist import add_to_playlist
from chalicelib.services.spotify.get_current_playing import get_currently_playing
from chalicelib.services.spotify.get_search_songs import search_songs
from chalicelib.services.auth import spotify
from chalicelib.services.auth.spotify import get_token

spotify_routes = Blueprint(__name__)


@spotify_routes.route("/spotifyConnect", methods=["GET"], cors=True)
def spotify_connect_get():
    username = spotify_routes.current_request.query_params["username"]
    url = spotify.app_authorization() + "&state=" + str(username)
    return Response(body="", headers={"Location": url}, status_code=302)


@spotify_routes.route("/spotifySearch", methods=["GET"], cors=True)
def spotify_search_get():
    params = spotify_routes.current_request.query_params
    search_result = search_songs(song_query=params["query"], room_guid=params["room_guid"])
    return {"songs": search_result}


@spotify_routes.route("/spotifyCallback", methods=["GET"], cors=True)
def spotify_callback_get():
    params = spotify_routes.current_request.query_params
    token = get_token(code=params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(params["state"], token["access_token"], token["refresh_token"], spotify_user)
    return Response(body="", headers={"Location": "https://www.djantwon.com"}, status_code=302)


@spotify_routes.route("/spotifyAddToPlaylist", methods=["POST"], cors=True)
def spotify_add_to_playlist():
    body = spotify_routes.current_request.json_body
    add_to_playlist(room_guid=body["room_guid"], song_uri=body["song_uri"])


@spotify_routes.route("/spotifyCurrentlyPlaying", methods=["GET"], cors=True)
def spotify_currently_playing_get():
    room_guid = spotify_routes.current_request.query_params["room_guid"]
    song = get_currently_playing(room_guid=room_guid)
    return {"song": song}
