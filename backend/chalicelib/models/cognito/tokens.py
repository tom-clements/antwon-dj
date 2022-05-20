from dataclasses import dataclass

from chalicelib.models.base_dto import BaseDto


@dataclass
class CognitoDto(BaseDto):
    pass


@dataclass
class TokenDto(CognitoDto):
    id_token: str
    access_token: str
    token_type: str
    expires_in: int


@dataclass
class CodeTokenDto(TokenDto):
    refresh_token: str
