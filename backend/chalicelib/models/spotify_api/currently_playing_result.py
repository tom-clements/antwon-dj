from dataclasses import dataclass
from typing import Dict, Optional

from chalicelib.models.spotify_api.track import SpotifyTrack


@dataclass
class SpotifyCurrentlyPlayingContext:
    external_urls: Dict[str, str]
    href: str
    type: str
    uri: str


@dataclass
class SpotifyCurrentlyPlaying:
    timestamp: int
    context: Optional[SpotifyCurrentlyPlayingContext]
    progress_ms: int
    item: Optional[SpotifyTrack]
    currently_playing_type: str
    actions: Dict[str, Dict[str, bool]]
    is_playing: bool
