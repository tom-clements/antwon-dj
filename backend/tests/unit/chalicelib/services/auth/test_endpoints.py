from dataclasses import asdict
from unittest.mock import patch, Mock

from chalicelib.models.cognito.tokens import CodeTokenDto, TokenDto
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.services.auth.endpoints import (
    cognito_login_url,
    cognito_logout_url,
    cognito_user_info_request,
    cognito_tokens_code_request,
    cognito_tokens_refresh_token_request,
)


@patch("chalicelib.services.auth.endpoints.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.auth.endpoints.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.auth.endpoints.API_STAGE", "mock_stage")
@patch("chalicelib.services.auth.endpoints.LOGIN_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
def test_cognito_login_url() -> None:
    expected = (
        "mock_auth_url.com/login?"
        "client_id=client_id&"
        "response_type=code&"
        "scope=aws.cognito.signin.user.admin+email+openid+profile&"
        "redirect_uri=mock_redirect_url.com/mock_stage/mock_redirect_endpoint"
    )
    actual = cognito_login_url.__wrapped__("client_id")  # type: ignore
    assert actual == expected


@patch("chalicelib.services.auth.endpoints.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.auth.endpoints.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.auth.endpoints.API_STAGE", "mock_stage")
@patch("chalicelib.services.auth.endpoints.LOGOUT_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
def test_cognito_logout_url() -> None:
    expected = (
        "mock_auth_url.com/logout?"
        "client_id=test_client_id&"
        "logout_uri=mock_redirect_url.com/mock_stage/mock_redirect_endpoint"
    )
    actual = cognito_logout_url.__wrapped__("test_client_id")  # type: ignore
    assert actual == expected


@patch("chalicelib.services.auth.endpoints.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.auth.endpoints.requests")
def test_cognito_user_info_request(mock_requests: Mock, cognito_user_info: CognitoUserInfoDto) -> None:
    access_token = "access_token"
    token_type = "token_type"
    json_response = asdict(cognito_user_info)
    json_response["email_verified"] = "true"
    url = "mock_auth_url.com/oauth2/userInfo"
    headers = {"Authorization": f"{token_type} {access_token}"}

    mock_requests.get.return_value.json.return_value = json_response
    actual = cognito_user_info_request(access_token, token_type)
    assert actual == cognito_user_info

    mock_requests.get.assert_called_once_with(url, headers=headers)
    mock_requests.get.return_value.json.assert_called_once()


@patch("chalicelib.services.auth.endpoints.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.auth.endpoints.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.auth.endpoints.API_STAGE", "mock_stage")
@patch("chalicelib.services.auth.endpoints.LOGIN_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
@patch("chalicelib.services.auth.endpoints.requests")
def test_cognito_tokens_code_request(mock_requests: Mock, cognito_code_token: CodeTokenDto) -> None:
    client_id = "client_id"
    client_secret = "client_secret"
    code = "code"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": "mock_redirect_url.com/mock_stage/mock_redirect_endpoint",
    }
    mock_requests.post.return_value.json.return_value = asdict(cognito_code_token)
    actual = cognito_tokens_code_request.__wrapped__(client_id, client_secret, code)  # type: ignore
    assert actual == cognito_code_token

    mock_requests.post.assert_called_once_with("mock_auth_url.com/oauth2/token", data=data)
    mock_requests.post.return_value.json.assert_called_once()


@patch("chalicelib.services.auth.endpoints.AUTH_URL", "mock_auth_url.com")
@patch("chalicelib.services.auth.endpoints.API_URL", "mock_redirect_url.com")
@patch("chalicelib.services.auth.endpoints.API_STAGE", "mock_stage")
@patch("chalicelib.services.auth.endpoints.LOGIN_REDIRECT_ENDPOINT", "mock_redirect_endpoint")
@patch("chalicelib.services.auth.endpoints.requests")
def test_cognito_tokens_refresh_token_request(mock_requests: Mock, cognito_token: TokenDto) -> None:
    client_id = "client_id"
    client_secret = "client_secret"
    refresh_token = "refresh_token"
    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": "mock_redirect_url.com/mock_stage/mock_redirect_endpoint",
    }
    mock_requests.post.return_value.json.return_value = asdict(cognito_token)
    actual = cognito_tokens_refresh_token_request.__wrapped__(client_id, client_secret, refresh_token)  # type: ignore
    assert actual == cognito_token

    mock_requests.post.assert_called_once_with("mock_auth_url.com/oauth2/token", data=data)
    mock_requests.post.return_value.json.assert_called_once()
