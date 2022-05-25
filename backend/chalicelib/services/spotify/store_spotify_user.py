from chalicelib.services.spotify.auth import get_token, get_spotify
from chalicelib.services.spotify.add_spotify_user import add_spotify_user


def store_spotify_user(code: str, username: str) -> None:
    token = get_token(code=code)
    sp = get_spotify(auth=token["access_token"])
    spotify_user = sp.current_user()
    add_spotify_user(username, token["access_token"], token["refresh_token"], spotify_user)
