from dataclasses import dataclass
from typing import Optional


@dataclass
class SpotifyImage:
    height: Optional[int]
    width: Optional[int]
    url: str
