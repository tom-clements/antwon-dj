from dataclasses import dataclass
from typing import Dict, List, Optional

from chalicelib.models.base_dto import BaseDto
from chalicelib.models.spotify_api.image import SpotifyImage


@dataclass
class PlaylistOwner(BaseDto):
    display_name: str
    external_urls: Dict[str, str]
    href: str
    id: str
    type: str
    uri: str


@dataclass
class PlaylistTrack(BaseDto):
    href: str
    total: int


@dataclass
class SimpleSpotifyPlaylist(BaseDto):
    playlist_id: str
    name: str


@dataclass
class SpotifyPlaylist(BaseDto):
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

    def simplify(self) -> SimpleSpotifyPlaylist:
        return SimpleSpotifyPlaylist(playlist_id=self.id, name=self.id)
