import base64
import json
from typing import Dict, Any, Callable
from urllib.parse import quote, urlencode

import requests
from functools import wraps

import spotipy  # type: ignore
from spotipy import oauth2
from spotipy.oauth2 import SpotifyClientCredentials  # type: ignore

from chalicelib.data.queries.read_spotify_user_tokens import read_spotify_user_tokens
from chalicelib.data.queries.update_spotify_user import update_spotify_user
from chalicelib.services.utils.aws_secrets import AwsSecretRetrieval
from chalicelib.utils.env import API_URL, API_STAGE, SPOTIFY_REDIRECT_ENDPOINT

SCOPES = (
    "playlist-read-collaborative user-modify-playback-state user-read-playback-state "
    "user-read-private playlist-modify-private playlist-modify-public"
)


@AwsSecretRetrieval("spotify_client", spotify_id="SPOTIFY_CLIENT_ID")
def app_authorization(spotify_id: str) -> str:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    f = {
        "response_type": "code",
        "client_id": spotify_id,
        "scope": SCOPES,
        "redirect_uri": f"{API_URL}{api_stage}/{SPOTIFY_REDIRECT_ENDPOINT}",
    }
    url = "https://accounts.spotify.com/authorize?{}".format(urlencode(f, quote_via=quote)).replace("%2F", "/")
    return url


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_spotify(auth: str, spotify_id: str, spotify_secret: str) -> spotipy.Spotify:
    client_credentials_manager = SpotifyClientCredentials(client_id=spotify_id, client_secret=spotify_secret)
    sp = spotipy.Spotify(auth=auth, client_credentials_manager=client_credentials_manager)
    return sp


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_token(code: str, spotify_id: str, spotify_secret: str) -> Dict[str, str]:
    api_stage = f"/{API_STAGE}" if API_STAGE else ""
    data = {
        "code": code,
        "redirect_uri": f"{API_URL}{api_stage}/user/spotify/callback",
        "grant_type": "authorization_code",
    }
    url = "https://accounts.spotify.com/api/token"
    base64encoded = base64.b64encode(bytes("{}:{}".format(spotify_id, spotify_secret), "utf-8"))
    headers = {"Authorization": "Basic {}".format(str(base64encoded, "utf-8"))}
    res = requests.post(url, headers=headers, data=data)
    return json.loads(res.text)


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def refresh_spotify_token(refresh_token: str, spotify_secret: str, spotify_id: str) -> str:
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


def use_spotify_session(f: Callable) -> Callable:
    @wraps(f)
    def decorated(*args: Any, **kwargs: Dict[str, Any]) -> Any:
        if "spotify_session" not in kwargs:
            spotify_user = read_spotify_user_tokens(kwargs["room_guid"])
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
