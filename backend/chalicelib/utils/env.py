import os
from typing import Final


API_STAGE = str(os.getenv("API_STAGE"))
BASE_URL = str(os.getenv("BASE_URL"))
API_URL: Final = str(os.getenv("API_URL"))
AUTH_URL: Final = str(os.getenv("AUTH_URL"))
LOGIN_REDIRECT_ENDPOINT: Final = str("login/callback")

assert API_STAGE is not None, API_STAGE
assert BASE_URL is not None, BASE_URL
assert API_URL is not None, API_URL
assert AUTH_URL is not None, AUTH_URL
assert LOGIN_REDIRECT_ENDPOINT is not None, LOGIN_REDIRECT_ENDPOINT
