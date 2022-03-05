from chalice import CognitoUserPoolAuthorizer


def get_authorizer(scopes=None):
    if scopes is None:
        scopes = ["email", "openid", "profile"]
    return CognitoUserPoolAuthorizer(
        name="antwon_user_pool",
        provider_arns=["arn:aws:cognito-idp:eu-west-2:303078101535:userpool/eu-west-2_Y4hA2uEzU"],
        scopes=scopes,
    )
