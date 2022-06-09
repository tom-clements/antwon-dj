from typing import Optional

import jwt

from chalicelib.data.queries.read_scalar_queries import read_room_code_from_username, read_spotify_user_from_username
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.utils.aws_secrets import AwsSecretRetrieval
from chalicelib.utils.env import ENVIRONMENT


def get_room_code_from_username(username: str) -> Optional[str]:
    return read_room_code_from_username(username=username)


def get_is_spotify_connected(username: str) -> bool:
    spotify_user_id = read_spotify_user_from_username(username=username)
    return bool(spotify_user_id)


@AwsSecretRetrieval(
    "cognito_client_credentials", client_secret="local_client_secret" if ENVIRONMENT == "local" else "client_secret"
)
def decode_user_info_from_id_token(id_token: str, client_secret: str) -> CognitoUserInfoDto:
    decoded_token = jwt.decode(id_token, key=client_secret, options={"verify_signature": False})
    picture = decoded_token["picture"] if "picture" in decoded_token else None
    return CognitoUserInfoDto(
        username=decoded_token["cognito:username"],
        email=decoded_token["email"],
        email_verified=decoded_token["email_verified"],
        sub=decoded_token["sub"],
        name=decoded_token["name"],
        picture=picture,
    )
