from chalice.app import CognitoUserPoolAuthorizer


def get_authorizer() -> CognitoUserPoolAuthorizer:
    return CognitoUserPoolAuthorizer(
        name="antwon_user_pool",
        provider_arns=["arn:aws:cognito-idp:eu-west-2:303078101535:userpool/eu-west-2_Y4hA2uEzU"],
        scopes=["email", "openid", "profile"],
        header="Authorization",
    )
