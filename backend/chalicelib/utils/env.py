import os
from typing import Final

ENVIRONMENT: Final = str(os.getenv("ENVIRONMENT"))
API_STAGE: Final = str(os.getenv("API_STAGE"))
BASE_URL: Final = str(os.getenv("BASE_URL"))
API_URL: Final = str(os.getenv("API_URL"))
AUTH_URL: Final = str(os.getenv("AUTH_URL"))
LOGIN_REDIRECT_ENDPOINT: Final = str("login/callback")

assert ENVIRONMENT is not None, ENVIRONMENT
assert API_STAGE is not None, API_STAGE
assert BASE_URL is not None, BASE_URL
assert API_URL is not None, API_URL
assert AUTH_URL is not None, AUTH_URL
assert LOGIN_REDIRECT_ENDPOINT is not None, LOGIN_REDIRECT_ENDPOINT
