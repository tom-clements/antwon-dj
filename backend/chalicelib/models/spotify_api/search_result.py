from dataclasses import dataclass
from typing import Optional, List

from chalicelib.models.base_dto import BaseDto
from chalicelib.models.spotify_api.track import SpotifyTrack


@dataclass
class SpotifySearchResultTracks(BaseDto):
    href: str
    items: List[SpotifyTrack]
    limit: int
    next: Optional[str]
    offset: int
    previous: Optional[str]
    total: int


@dataclass
class SpotifySearchResult(BaseDto):
    tracks: SpotifySearchResultTracks
