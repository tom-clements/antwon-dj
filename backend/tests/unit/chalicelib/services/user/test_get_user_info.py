from typing import Optional
from unittest.mock import patch, Mock

import pytest

from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.user.get_user_info import get_room_code_from_username, get_is_spotify_connected


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


@pytest.mark.parametrize("spotify_user_id", [None, 1])
@patch("chalicelib.services.user.get_user_info.read_spotify_user_from_username")
def test_get_is_spotify_connectede(
    mock_read_spotify_user_from_username: Mock, cognito_user_info: CognitoUserInfoDto, spotify_user_id: Optional[int]
) -> None:
    username = "username"
    mock_read_spotify_user_from_username.return_value = spotify_user_id

    actual = get_is_spotify_connected(username)
    assert actual == bool(spotify_user_id)

    mock_read_spotify_user_from_username.assert_called_once_with(username=username)
