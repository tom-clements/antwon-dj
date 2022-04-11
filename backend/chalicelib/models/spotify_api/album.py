from dataclasses import dataclass
from typing import List, Dict, Optional

from chalicelib.models.spotify_api.artist import SpotifyArtist
from chalicelib.models.spotify_api.image import SpotifyImage


@dataclass
class SpotifyAlbum:
    album_type: str
    artists: List[SpotifyArtist]
    type: str
    uri: str
    available_markets: Optional[List[str]]
    external_urls: Dict[str, str]
    href: str
    id: str
    images: List[SpotifyImage]
    name: str
    release_date: str
    release_date_precision: str
    total_tracks: int
