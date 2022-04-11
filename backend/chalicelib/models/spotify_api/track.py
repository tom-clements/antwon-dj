from dataclasses import dataclass
from typing import List, Dict, Optional

from chalicelib.models.spotify_api.album import SpotifyAlbum
from chalicelib.models.spotify_api.artist import SpotifyArtist


@dataclass
class SpotifyTrack:
    album: SpotifyAlbum
    artists: List[SpotifyArtist]
    available_markets: Optional[List[str]]
    disc_number: int
    duration_ms: int
    explicit: bool
    external_ids: Dict[str, str]
    external_urls: Dict[str, str]
    href: str
    id: str
    is_local: bool
    name: str
    popularity: int
    preview_url: Optional[str]
    track_number: int
    type: str
    uri: str


@dataclass
class SpotifyTrackFormatted:
    song_uri: str
    song_artist: str
    song_name: str
    song_album_url: str
