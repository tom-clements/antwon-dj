import os
from typing import Final

ENVIRONMENT: Final[str] = str(os.getenv("ENVIRONMENT"))
API_STAGE: Final[str] = str(os.getenv("API_STAGE"))
BASE_URL: Final[str] = str(os.getenv("BASE_URL"))
API_URL: Final[str] = str(os.getenv("API_URL"))
AUTH_URL: Final[str] = str(os.getenv("AUTH_URL"))
COGNITO_POOL_NAME: Final[str] = str("COGNITO_POOL_NAME")
COGNITO_POOL_ARN: Final[str] = str("login/COGNITO_POOL_ARN")
LOGIN_REDIRECT_ENDPOINT: Final[str] = str("login/callback")


assert ENVIRONMENT is not None, ENVIRONMENT
assert API_STAGE is not None, API_STAGE
assert BASE_URL is not None, BASE_URL
assert API_URL is not None, API_URL
assert AUTH_URL is not None, AUTH_URL
assert COGNITO_POOL_NAME is not None, COGNITO_POOL_NAME
assert COGNITO_POOL_ARN is not None, COGNITO_POOL_ARN
assert LOGIN_REDIRECT_ENDPOINT is not None, LOGIN_REDIRECT_ENDPOINT
