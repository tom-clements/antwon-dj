from pytest import fixture

from chalicelib.models.cognito.tokens import CodeTokenDto, TokenDto


@fixture()
def cognito_token() -> TokenDto:
    return TokenDto(
        access_token="access_token",
        token_type="token_type",
        id_token="id_token",
        expires_in=0,
    )


@fixture()
def cognito_code_token() -> CodeTokenDto:
    return CodeTokenDto(
        access_token="access_token",
        token_type="token_type",
        id_token="id_token",
        refresh_token="refresh_token",
        expires_in=0,
    )
