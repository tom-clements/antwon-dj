from unittest.mock import patch, Mock

import pytest

from chalicelib.data.error_handling import UserNotFoundDbError
from chalicelib.models import User
from chalicelib.services.user.add_user import add_user_if_not_exists


@pytest.mark.parametrize("is_read_user_side_effect, expected_create_called", [(False, True), (True, False)])
@patch("chalicelib.services.user.add_user.read_user")
@patch("chalicelib.services.user.add_user.create_user")
def test_add_user_if_not_exists(
    mock_create_user: Mock, mock_read_user: Mock, is_read_user_side_effect: bool, expected_create_called: bool
) -> None:
    username = "username"
    user = User(user_username=username)
    if is_read_user_side_effect:
        mock_read_user.side_effect = UserNotFoundDbError(username)
    else:
        mock_read_user.return_value = user
    add_user_if_not_exists(username)
    mock_read_user.assert_called_once_with(username)
    if expected_create_called:
        mock_create_user.assert_called_once_with(username)
    else:
        mock_create_user.assert_not_called()
