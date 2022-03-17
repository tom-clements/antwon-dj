from chalice import CORSConfig


def get_cors_config(allow_origin: str = "https://www.djantwon.com") -> CORSConfig:
    return CORSConfig(
        allow_origin=allow_origin,
        allow_headers=["X-Special-Header"],
        max_age=600,
        expose_headers=["X-Special-Header"],
        allow_credentials=True,
    )
