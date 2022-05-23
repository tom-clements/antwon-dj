from unittest.mock import patch, Mock

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.user.get_user_info import get_room_code_from_username


@patch("chalicelib.services.user.get_user_info.read_room_code_from_username")
def test_get_room_code_from_username(
    mock_read_room_code_from_username: Mock,
    cognito_user_info: CognitoUserInfoDto,
) -> None:
    username = "username"
    room_code = "room_code"

    mock_read_room_code_from_username.return_value = room_code

    actual = get_room_code_from_username(username)
    assert actual == room_code

    mock_read_room_code_from_username.assert_called_once_with(username=username)
