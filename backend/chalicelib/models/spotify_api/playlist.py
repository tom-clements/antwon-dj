from dataclasses import dataclass
from typing import Dict, List, Optional

from chalicelib.models.spotify_api.image import SpotifyImage


@dataclass
class PlaylistOwner:
    display_name: str
    external_urls: Dict[str, str]
    href: str
    id: str
    type: str
    uri: str


@dataclass
class PlaylistTrack:
    href: str
    total: int


@dataclass
class SpotifyPlaylist:
    collaborative: bool
    description: str
    external_urls: Dict[str, str]
    href: str
    id: str
    images: List[SpotifyImage]
    name: str
    owner: PlaylistOwner
    primary_color: Optional[str]
    public: bool
    snapshot_id: str
    tracks: PlaylistTrack
    type: str
    uri: str
