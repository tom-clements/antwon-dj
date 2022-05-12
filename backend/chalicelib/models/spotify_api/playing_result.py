from dataclasses import dataclass
from typing import Dict, Optional

from chalicelib.models.spotify_api.track import SpotifyTrack


@dataclass
class SpotifyPlayingContext:
    external_urls: Dict[str, str]
    href: str
    type: str
    uri: str


@dataclass
class SpotifyPlaying:
    timestamp: int
    context: Optional[SpotifyPlayingContext]
    progress_ms: int
    item: Optional[SpotifyTrack]
    currently_playing_type: str
    actions: Dict[str, Dict[str, bool]]
    is_playing: bool
