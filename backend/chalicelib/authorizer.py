from chalice.app import CognitoUserPoolAuthorizer

from chalicelib.utils.env import COGNITO_POOL_NAME, COGNITO_POOL_ARN


def get_authorizer() -> CognitoUserPoolAuthorizer:
    return CognitoUserPoolAuthorizer(
        name=COGNITO_POOL_NAME,
        provider_arns=[COGNITO_POOL_ARN],
        scopes=["email", "openid", "profile"],
        header="Authorization",
    )
