from dataclasses import dataclass

from chalicelib.models.cognito.tokens import CognitoDto


@dataclass
class CognitoUserInfoDto(CognitoDto):
    sub: str
    email_verified: bool
    name: str
    email: str
    username: str
