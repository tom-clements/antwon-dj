import base64
import json

import requests
from chalice import Blueprint, ChaliceViewError, Response

from chalicelib.endpoints.spotify.core import add_spotify_user, search_songs, get_currently_playing, add_to_playlist
from chalicelib.utils import spotify
from chalicelib.utils.secrets import AwsSecretRetrieval

spotify_routes = Blueprint(__name__)


@spotify_routes.route("/spotifyConnect", methods=["GET"], cors=True)
def spotify_connect_get():
    user_guid = spotify_routes.current_request.query_params["user_guid"]
    url = spotify.app_authorization() + "&state=" + str(user_guid)
    return Response(body="Plain text error message", headers={"Location": url}, status_code=302)


@spotify_routes.route("/spotifySearch", methods=["GET"], cors=True)
def spotify_search_get():
    params = spotify_routes.current_request.query_params
    spotify_routes.log.info(f"/spotifySearch {params['query']} initialised")
    search_result = search_songs(
        song_query=params["query"], room_guid=params["room_guid"], spotify_routes=spotify_routes
    )
    spotify_routes.log.info(f"/spotifySearch {params['query']} complete")
    return {"songs": search_result}


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_token(code, spotify_id, spotify_secret):
    data = {"code": code, "redirect_uri": "http://127.0.0.1:8000/spotifyCallback", "grant_type": "authorization_code"}
    url = "https://accounts.spotify.com/api/token"
    base64encoded = base64.b64encode(bytes("{}:{}".format(spotify_id, spotify_secret), "utf-8"))
    headers = {
        "Authorization": "Basic {}".format(str(base64encoded, "utf-8")),
        "Content-Type": "application/x-www-form-urlencoded",
    }
    res = requests.post(url, headers=headers, data=data)
    return json.loads(res.text)


@spotify_routes.route("/spotifyCallback", methods=["GET"], cors=True)
def spotify_callback_get():
    params = spotify_routes.current_request.query_params
    token = get_token(code=params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(params["state"], token["access_token"], token["refresh_token"], spotify_user)
    return Response(body="Plain text error message", headers={"Location": "https://www.djantwon.com"}, status_code=302)


@spotify_routes.route("/spotifyAddToPlaylist", methods=["POST"], cors=True)
def spotify_add_to_playlist():
    body = spotify_routes.current_request.json_body
    return add_to_playlist(room_guid=body["room_guid"], song_uri=body["song_uri"])


@spotify_routes.route("/spotifyCurrentlyPlaying", methods=["GET"], cors=True)
def spotify_currently_playing_get():
    room_guid = spotify_routes.current_request.query_params["room_guid"]
    song = get_currently_playing(room_guid=room_guid)
    return {"statusCode": 200, "song": song}
