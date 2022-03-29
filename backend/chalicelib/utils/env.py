import os
from typing import Final


API_STAGE = os.getenv("API_STAGE")
BASE_URL = os.getenv("BASE_URL")
API_URL: Final = os.getenv("API_URL")
AUTH_URL: Final = os.getenv("AUTH_URL")
LOGIN_REDIRECT_ENDPOINT: Final = "login/callback"
