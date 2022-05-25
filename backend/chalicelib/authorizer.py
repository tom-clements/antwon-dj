from chalice.app import CognitoUserPoolAuthorizer

from chalicelib.utils.env import COGNITO_POOL_NAME, COGNITO_POOL_ARN, ENVIRONMENT


def get_authorizer() -> CognitoUserPoolAuthorizer:
    # this is required as the deployment doesn't pick up env variables
    # for some reason
    # TODO: investigate why this is
    if ENVIRONMENT == "local":
        return CognitoUserPoolAuthorizer(
            name=COGNITO_POOL_NAME,
            provider_arns=[COGNITO_POOL_ARN],
            scopes=["email", "openid", "profile"],
            header="Authorization",
        )
    return CognitoUserPoolAuthorizer(
        name="antwon_user_pool",
        provider_arns=["arn:aws:cognito-idp:eu-west-2:303078101535:userpool/eu-west-2_Y4hA2uEzU"],
        scopes=["email", "openid", "profile"],
        header="Authorization",
    )
