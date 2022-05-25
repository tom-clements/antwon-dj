from unittest.mock import patch, Mock

from chalicelib.models.cognito.tokens import CodeTokenDto
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.user.get_login import user_signup_callback


@patch("chalicelib.services.user.get_login.cognito_tokens_code_request")
@patch("chalicelib.services.user.get_login.cognito_user_info_request")
@patch("chalicelib.services.user.get_login.add_user_if_not_exists")
def test_user_signup_callback(
    mock_add_user_if_not_exists: Mock,
    mock_cognito_user_info_request: Mock,
    mock_cognito_tokens_code_request: Mock,
    cognito_user_info: CognitoUserInfoDto,
    cognito_code_token: CodeTokenDto,
) -> None:
    code = "code"
    expected = cognito_code_token.refresh_token

    mock_cognito_tokens_code_request.return_value = cognito_code_token
    mock_cognito_user_info_request.return_value = cognito_user_info
    actual = user_signup_callback(code=code)

    mock_cognito_tokens_code_request.assert_called_with(code=code)
    mock_cognito_user_info_request.assert_called_once_with(
        cognito_code_token.access_token, cognito_code_token.token_type
    )
    mock_add_user_if_not_exists.assert_called_once_with(cognito_user_info.username)
    assert actual == expected
