from pytest import fixture

from chalicelib.models.cognito.tokens import CodeTokenDto


@fixture()
def code_token() -> CodeTokenDto:
    return CodeTokenDto(
        access_token="access_token",
        token_type="token_type",
        id_token="id_token",
        refresh_token="refresh_token",
        expires_in=0,
    )
