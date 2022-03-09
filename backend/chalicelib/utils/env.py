from typing import Final


# TODO: set these as env variables
API_STAGE = "dev"
API_URL: Final = f"https://api.djantwon.com/{API_STAGE}"
AUTH_URL: Final = "https://auth.djantwon.com"
LOGIN_REDIRECT_URL: Final = "https://api.djantwon.com/dev/login/callback"
