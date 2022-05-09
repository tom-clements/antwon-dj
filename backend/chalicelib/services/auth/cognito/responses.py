from dataclasses import dataclass


@dataclass
class CognitoDto:
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


@dataclass
class UserInfoDto(CognitoDto):
    sub: str
    email_verified: str
    name: str
    email: str
    username: str
