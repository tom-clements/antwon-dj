from chalice import Blueprint

from chalicelib.endpoints.spotify.core import add_spotify_user, search_songs, get_currently_playing, add_to_playlist
from chalicelib.utils import spotify


spotify_routes = Blueprint(__name__)


@spotify_routes.route("/spotifyConnect", methods=["GET"], cors=True)
def spotify_connect_get():
    user_guid = spotify_routes.current_request.query_params["user_guid"]
    url = spotify.app_Authorization() + "&state=" + str(user_guid)
    response = {"statusCode": 302, "headers": {"Location": url}}
    return response


@spotify_routes.route("/spotifySearch", methods=["GET"], cors=True)
def spotify_search_get():
    params = spotify_routes.current_request.query_params
    spotify_routes.log.info(f"/spotifySearch {params['query']} initialised")
    res = search_songs(song_query=params["query"], room_guid=params["room_guid"], spotify_routes=spotify_routes)
    spotify_routes.log.info(f"/spotifySearch {params['query']} complete")
    return res


@spotify_routes.route("/spotifyCallback", methods=["GET"], cors=True)
def spotify_callback_get():
    params = spotify_routes.current_request.query_params
    token = spotify.get_token(code=params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(params["state"], spotify_user)
    return {"statusCode": 302, "headers": {"Location": "https://www.djantwon.com/spoitfy_auth"}}


@spotify_routes.route("/spotifyAddToPlaylist", methods=["POST"], cors=True)
def spotify_add_to_playlist():
    body = spotify_routes.current_request.json_body
    return add_to_playlist(room_guid=body["room_guid"], song_uri=body["song_uri"])


@spotify_routes.route("/spotifyCurrentlyPlaying", methods=["GET"], cors=True)
def spotify_currently_playing_get():
    room_guid = spotify_routes.current_request.query_params["room_guid"]
    res = get_currently_playing(room_guid=room_guid)
    return res
