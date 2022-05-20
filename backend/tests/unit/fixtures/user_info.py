from dataclasses import asdict

from pytest import fixture

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.endpoints.user_info import UserInfoDto


@fixture()
def cognito_user_info() -> CognitoUserInfoDto:
    return CognitoUserInfoDto(sub="", email_verified=True, name="", email="", username="username")


@fixture()
def user_info(cognito_user_info: CognitoUserInfoDto) -> UserInfoDto:
    return UserInfoDto(room_code="room_code", **asdict(cognito_user_info))
