from unittest.mock import patch, Mock

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.endpoints.user_info import UserInfoDto
from chalicelib.services.user.get_user_info import get_user_info


@patch("chalicelib.services.user.get_user_info.get_room_code_from_username")
@patch("chalicelib.services.user.get_user_info.get_cognito_user_info")
def test_get_user_info(
    mock_get_cognito_user_info: Mock,
    mock_get_room_code_from_username: Mock,
    cognito_user_info: CognitoUserInfoDto,
    user_info: UserInfoDto,
) -> None:
    username = "username"
    token = "token"
    token_type = "token_type"
    room_code = "room_code"

    mock_get_cognito_user_info.return_value = cognito_user_info
    mock_get_room_code_from_username.return_value = room_code

    actual = get_user_info(username, token, token_type)
    assert actual == user_info

    mock_get_cognito_user_info.assert_called_once_with(access_token=token, token_type=token_type)
    mock_get_room_code_from_username.assert_called_once_with(username=username)
