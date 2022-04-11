from dataclasses import dataclass
from typing import List

from chalicelib.models.spotify_api.track import SpotifyTrack


@dataclass
class SpotifyRecommenderResultSeed:
    initialPoolSize: int
    afterFilteringSize: int
    afterRelinkingSize: int
    id: str
    type: str
    href: str


@dataclass
class SpotifyRecommenderResult:
    tracks: List[SpotifyTrack]
    seeds: List[SpotifyRecommenderResultSeed]
