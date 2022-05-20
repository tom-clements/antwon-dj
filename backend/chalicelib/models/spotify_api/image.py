from dataclasses import dataclass
from typing import Optional

from chalicelib.models.base_dto import BaseDto


@dataclass
class SpotifyImage(BaseDto):
    height: Optional[int]
    width: Optional[int]
    url: str
