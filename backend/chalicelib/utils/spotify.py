import base64
import urllib
import json
import requests
from functools import wraps

import spotipy
from spotipy import oauth2
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import Room, SpotifyUser
from chalicelib.utils.secrets import AwsSecretRetrieval
from chalicelib.utils.chalice import get_base_url


SCOPES = "playlist-read-collaborative user-modify-playback-state user-read-playback-state user-read-private playlist-modify-private playlist-modify-public"


@AwsSecretRetrieval("spotify_client", spotify_id="SPOTIFY_CLIENT_ID")
def app_Authorization(spotify_id):
    f = {
        "response_type": "code",
        "client_id": spotify_id,
        "scope": SCOPES,
        "redirect_uri": f"{get_base_url()}/spotifyCallback",
    }
    url = "https://accounts.spotify.com/authorize?{}".format(urllib.parse.urlencode(f))
    return url


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_spotify(auth, spotify_id, spotify_secret):
    client_credentials_manager = SpotifyClientCredentials(client_id=spotify_id, client_secret=spotify_secret)
    sp = spotipy.Spotify(auth=auth, client_credentials_manager=client_credentials_manager)
    return sp


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def get_token(code, spotify_id, spotify_secret):
    data = {"code": code, "redirect_uri": f"{get_base_url()}/spotifyCallback", "grant_type": "authorization_code"}
    url = "https://accounts.spotify.com/api/token"
    base64encoded = base64.b64encode(bytes("{}:{}".format(spotify_id, spotify_secret), "utf-8"))
    headers = {"Authorization": "Basic {}".format(str(base64encoded, "utf-8"))}
    res = requests.post(url, headers=headers, data=data)
    return json.loads(res.text)


@AwsSecretRetrieval("spotify_client", spotify_secret="SPOTIFY_CLIENT_SECRET", spotify_id="SPOTIFY_CLIENT_ID")
def refresh_spotify_token(refresh_token, spotify_secret, spotify_id):
    sp_oauth = oauth2.SpotifyOAuth(
        client_id=spotify_id,
        client_secret=spotify_secret,
        redirect_uri=f"{get_base_url()}/spotifyCallback",
        scope=SCOPES,
    )
    # if sp_oauth.is_token_expired({'access_token': access_token, 'refresh_token': refresh_token}):
    token_info = sp_oauth.refresh_access_token(refresh_token)
    token = token_info["access_token"]
    return token


@db.use_db_session
def get_spotify_user(db_session: session, room_guid: str):
    return (
        db_session.query(
            SpotifyUser.spotify_user_id, SpotifyUser.spotify_access_token, SpotifyUser.spotify_refresh_token
        )
        .select_from(SpotifyUser)
        .join(Room, Room.owner_user_id == SpotifyUser.user_id)
        .filter(Room.room_guid == room_guid)
        .one()
    )


@db.use_db_session
def update_spotify_token(db_session: session, token: str, spotify_user_id: str):
    db_session.query(SpotifyUser).filter(SpotifyUser.spotify_user_id == spotify_user_id).update(
        {SpotifyUser.spotify_access_token: token}, synchronize_session=False
    )
    db_session.commit()


def use_spotify_session(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        spotify_user = get_spotify_user(kwargs["room_guid"])
        try:
            spotify_session = get_spotify(auth=spotify_user.spotify_access_token)
            return f(spotify_session, *args, **kwargs)
        except spotipy.client.SpotifyException:
            token = refresh_spotify_token(spotify_user.spotify_refresh_token)
            update_spotify_token(token, spotify_user.spotify_user_id)
            spotify_session = get_spotify(auth=token)
            return f(spotify_session, *args, **kwargs)

    return decorated
