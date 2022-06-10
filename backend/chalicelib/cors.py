from chalice import CORSConfig

from chalicelib.utils.env import BASE_URL


def get_cors_config(allow_origin: str = BASE_URL) -> CORSConfig:
    return CORSConfig(
        allow_origin=allow_origin,
        allow_headers=["X-Special-Header"],
        max_age=600,
        expose_headers=["X-Special-Header"],
        allow_credentials=True,
    )
