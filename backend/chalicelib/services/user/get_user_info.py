from dataclasses import asdict

from chalicelib.data.read_scalar_queries import get_room_code_from_username
from chalicelib.models.endpoints.user_info import UserInfoDto
from chalicelib.services.auth.cognito.endpoints import get_cognito_user_info


def get_user_info(username: str, token: str, token_type: str) -> UserInfoDto:
    cognito_user_info = get_cognito_user_info(access_token=token, token_type=token_type)
    room_code = get_room_code_from_username(username=username)
    return UserInfoDto(room_code=room_code, **asdict(cognito_user_info))


{
    "sub": "31d45ad6-1253-4a40-80ce-914bdf462274",
    "email_verified": "false",
    "name": "Tom Clements",
    "email": "tomclem171@googlemail.com",
    "username": "google_111930311507543090805",
    "room_code": "SOIREE",
}
