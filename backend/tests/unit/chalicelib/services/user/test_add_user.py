from unittest.mock import patch, Mock

import pytest

from chalicelib.data.error_handling import UserNotFoundDbError
from chalicelib.models import User
from chalicelib.services.user.add_user import add_user_if_not_exists


@pytest.mark.parametrize("is_read_user_side_effect, expected_create_called", [(True, True), (False, False)])
@patch("chalicelib.services.user.add_user.read_user")
@patch("chalicelib.services.user.add_user.create_user")
@patch("chalicelib.services.user.add_user.update_user_id_token")
def test_add_user_if_not_exists(
    mock_update_user_id_token: Mock,
    mock_create_user: Mock,
    mock_read_user: Mock,
    is_read_user_side_effect: bool,
    expected_create_called: bool,
) -> None:
    id_token = "id_token"
    username = "username"
    user = User(user_username=username)
    if is_read_user_side_effect:
        mock_read_user.side_effect = UserNotFoundDbError(username)
    else:
        mock_read_user.return_value = user
    add_user_if_not_exists(username, id_token)
    mock_read_user.assert_called_once_with(username)
    if expected_create_called:
        mock_create_user.assert_called_once_with(username, id_token)
    else:
        mock_create_user.assert_not_called()
        mock_update_user_id_token.assert_called_once_with(username, id_token)
