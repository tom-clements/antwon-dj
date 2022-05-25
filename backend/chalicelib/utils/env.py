import os
from typing import Final

ENVIRONMENT: Final[str] = str(os.getenv("ENVIRONMENT"))
API_STAGE: Final[str] = str(os.getenv("API_STAGE"))
DOMAIN: Final[str] = str(os.getenv("DOMAIN"))
BASE_URL: Final[str] = str(os.getenv("BASE_URL"))
API_URL: Final[str] = str(os.getenv("API_URL"))
AUTH_URL: Final[str] = str(os.getenv("AUTH_URL"))
COGNITO_POOL_NAME: Final[str] = str("COGNITO_POOL_NAME")
COGNITO_POOL_ARN: Final[str] = str("login/COGNITO_POOL_ARN")
LOGIN_REDIRECT_ENDPOINT: Final[str] = str("login/callback")
LOGOUT_REDIRECT_ENDPOINT: Final[str] = str("logout/callback")
