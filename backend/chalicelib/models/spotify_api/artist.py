from dataclasses import dataclass
from typing import Dict


@dataclass
class SpotifyArtist:
    external_urls: Dict[str, str]
    href: str
    id: str
    name: str
    type: str
    uri: str
