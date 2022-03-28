from unittest.mock import patch, Mock

import pytest

from chalicelib.models import User
from chalicelib.services.user.add_user import add_user_if_not_exists


@pytest.mark.parametrize("read_user_value, expected_create_called", [(User(), False), (None, True)])
@patch("chalicelib.services.user.add_user.read_user")
@patch("chalicelib.services.user.add_user.create_user")
def test_add_user_if_not_exists(mock_create_user, mock_read_user, read_user_value, expected_create_called):
    mock_read_user.return_value = read_user_value
    add_user_if_not_exists("test_username")
    mock_read_user.assert_called_once_with("test_username")
    if expected_create_called:
        mock_create_user.assert_called_once_with("test_username")
    else:
        mock_create_user.assert_not_called()
