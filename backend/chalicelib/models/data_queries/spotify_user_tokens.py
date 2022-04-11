from dataclasses import dataclass


@dataclass
class SpotifyUserTokens:
    spotify_user_id: int
    spotify_access_token: str
    spotify_refresh_token: str
