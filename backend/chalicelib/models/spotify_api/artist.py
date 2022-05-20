from dataclasses import dataclass
from typing import Dict

from chalicelib.models.base_dto import BaseDto


@dataclass
class SpotifyArtist(BaseDto):
    external_urls: Dict[str, str]
    href: str
    id: str
    name: str
    type: str
    uri: str
