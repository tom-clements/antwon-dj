from dataclasses import dataclass

from chalicelib.models.base_dto import BaseDto


@dataclass
class SpotifyUserTokens(BaseDto):
    spotify_user_id: int
    spotify_access_token: str
    spotify_refresh_token: str
