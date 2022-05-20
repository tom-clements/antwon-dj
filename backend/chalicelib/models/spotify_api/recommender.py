from dataclasses import dataclass
from typing import List

from chalicelib.models.base_dto import BaseDto
from chalicelib.models.spotify_api.track import SpotifyTrack


@dataclass
class SpotifyRecommenderResultSeed(BaseDto):
    initialPoolSize: int
    afterFilteringSize: int
    afterRelinkingSize: int
    id: str
    type: str
    href: str


@dataclass
class SpotifyRecommenderResult(BaseDto):
    tracks: List[SpotifyTrack]
    seeds: List[SpotifyRecommenderResultSeed]
