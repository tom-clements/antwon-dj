import base64
import urllib
import json
import requests
from functools import wraps

import spotipy
from spotipy import oauth2
from spotipy.oauth2 import SpotifyClientCredentials
from chalicelib.antwondb import db_queries
from chalicelib.utils.secrets import get_secret
from chalicelib.utils.chalice import get_base_url


SCOPES = "playlist-read-collaborative user-modify-playback-state user-read-playback-state user-read-private playlist-modify-private playlist-modify-public"


def get_spotify_secrets():
    secrets = get_secret("spotify_client")
    return secrets


def app_Authorization():
    secrets = get_spotify_secrets()
    f = {
        "response_type": "code",
        "client_id": secrets["SPOTIFY_CLIENT_ID"],
        "scope": SCOPES,
        "redirect_uri": f"{get_base_url()}/spotifyCallback",
    }
    url = "https://accounts.spotify.com/authorize?{}".format(urllib.parse.urlencode(f))
    return url


def get_spotify(auth):
    secrets = get_spotify_secrets()
    client_credentials_manager = SpotifyClientCredentials(
        client_id=secrets["SPOTIFY_CLIENT_ID"], client_secret=secrets["SPOTIFY_CLIENT_SECRET"]
    )
    sp = spotipy.Spotify(auth=auth, client_credentials_manager=client_credentials_manager)
    return sp


def get_token(code):
    secrets = get_spotify_secrets()
    data = {"code": code, "redirect_uri": f"{get_base_url()}/spotifyCallback", "grant_type": "authorization_code"}
    url = "https://accounts.spotify.com/api/token"
    base64encoded = base64.b64encode(
        bytes("{}:{}".format(secrets["SPOTIFY_CLIENT_ID"], secrets["SPOTIFY_CLIENT_SECRET"]), "utf-8")
    )
    headers = {"Authorization": "Basic {}".format(str(base64encoded, "utf-8"))}
    res = requests.post(url, headers=headers, data=data)
    return json.loads(res.text)


def refresh_spotify_token(refresh_token):
    secrets = get_spotify_secrets()
    sp_oauth = oauth2.SpotifyOAuth(
        client_id=secrets["SPOTIFY_CLIENT_ID"],
        client_secret=secrets["SPOTIFY_CLIENT_SECRET"],
        redirect_uri=f"{get_base_url()}/spotifyCallback",
        scope=SCOPES,
    )
    # if sp_oauth.is_token_expired({'access_token': access_token, 'refresh_token': refresh_token}):
    token_info = sp_oauth.refresh_access_token(refresh_token)
    token = token_info["access_token"]
    return token


def get_spotify_session(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_id = db_queries.get_room_id_from_guid(kwargs["room_guid"])
        spotify_user = db_queries.get_spotify_user_details(user_id)
        try:
            spotify_session = get_spotify(auth=spotify_user["spotify_access_token"])
            return f(spotify_session, *args, **kwargs)
        except spotipy.client.SpotifyException:
            try:
                token = refresh_spotify_token(spotify_user["spotify_refresh_token"])
                db_queries.update_access_token(spotify_user["spotify_user_id"], token)
                spotify_session = get_spotify(auth=token)
                return f(spotify_session, *args, **kwargs)
            except:
                raise
                return get_spotify_session(f)

    return decorated
