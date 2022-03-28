import base64
import urllib
import json
import requests
from functools import wraps

import spotipy
from spotipy import oauth2
from spotipy.oauth2 import SpotifyClientCredentials

from chalicelib.data.read_spotify_user import read_spotify_user
from chalicelib.data.update_spotify_user import update_spotify_user
from chalicelib.services.auth.aws_secrets import AwsSecretRetrieval
from chalicelib.utils.env import API_URL, API_STAGE

SCOPES = "playlist-read-collaborative user-modify-playback-state user-read-playback-state user-read-private playlist-modify-private playlist-modify-public"


@AwsSecretRetrieval("spotify_client", spotify_id="SPOTIFY_CLIENT_ID")
def app_authorization(spotify_id: str):
    f = {
        "response_type": "code",
        "client_id": spotify_id,
        "scope": SCOPES,
        "redirect_uri": f"{API_URL}/{API_STAGE}/user/spotify/callback",
    }
    url = "https://accounts.spotify.com/authorize?{}".format(urllib.parse.urlencode(f))
    return url


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_spotify(auth: str, spotify_id: str, spotify_secret: str):
    client_credentials_manager = SpotifyClientCredentials(client_id=spotify_id, client_secret=spotify_secret)
    sp = spotipy.Spotify(auth=auth, client_credentials_manager=client_credentials_manager)
    return sp


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_token(code: str, spotify_id: str, spotify_secret: str):
    data = {
        "code": code,
        "redirect_uri": f"{API_URL}/{API_STAGE}/user/spotify/callback",
        "grant_type": "authorization_code",
    }
    url = "https://accounts.spotify.com/api/token"
    base64encoded = base64.b64encode(bytes("{}:{}".format(spotify_id, spotify_secret), "utf-8"))
    headers = {"Authorization": "Basic {}".format(str(base64encoded, "utf-8"))}
    res = requests.post(url, headers=headers, data=data)
    return json.loads(res.text)


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def refresh_spotify_token(refresh_token: str, spotify_secret: str, spotify_id: str):
    sp_oauth = oauth2.SpotifyOAuth(
        client_id=spotify_id,
        client_secret=spotify_secret,
        redirect_uri=f"{API_URL}/{API_STAGE}/user/spotify/callback",
        scope=SCOPES,
    )
    # if sp_oauth.is_token_expired({'access_token': access_token, 'refresh_token': refresh_token}):
    token_info = sp_oauth.refresh_access_token(refresh_token)
    token = token_info["access_token"]
    return token


def use_spotify_session(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "spotify_session" not in kwargs:
            spotify_user = read_spotify_user(kwargs["room_guid"])
            try:
                spotify_session = get_spotify(auth=spotify_user.spotify_access_token)
                kwargs["spotify_session"] = spotify_session
                return f(*args, **kwargs)
            except spotipy.client.SpotifyException:
                token = refresh_spotify_token(spotify_user.spotify_refresh_token)
                update_spotify_user(spotify_user.spotify_user_id, token, spotify_user.spotify_refresh_token)
                spotify_session = get_spotify(auth=token)
                kwargs["spotify_session"] = spotify_session
                return f(*args, **kwargs)
        else:
            return f(*args, **kwargs)

    return decorated
