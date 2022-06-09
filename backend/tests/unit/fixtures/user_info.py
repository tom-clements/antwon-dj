from dataclasses import asdict

import jwt
from pytest import fixture

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.endpoints.user_info import UserInfoDto
from chalicelib.services.utils.aws_secrets import AwsSecretRetrieval


@AwsSecretRetrieval("cognito_client_credentials", client_secret="local_client_secret")
def get_token(client_secret: str, cognito_user_info: CognitoUserInfoDto) -> str:
    user_info_dict = asdict(cognito_user_info)
    user_info_dict["cognito:username"] = user_info_dict["username"]
    user_info_dict.pop("username")
    token = jwt.encode(user_info_dict, client_secret)
    return token


@fixture()
def cognito_user_info() -> CognitoUserInfoDto:
    return CognitoUserInfoDto(
        sub="sub",
        email_verified=True,
        name="Test User",
        email="test_user@example.com",
        username="test_user",
        picture="picture",
    )


@fixture()
def user_info(cognito_user_info: CognitoUserInfoDto) -> UserInfoDto:
    return UserInfoDto(is_spotify_connected=True, room_code="room_code", **asdict(cognito_user_info))


@fixture()
def user_token(cognito_user_info: CognitoUserInfoDto) -> str:
    return get_token(cognito_user_info=cognito_user_info)
