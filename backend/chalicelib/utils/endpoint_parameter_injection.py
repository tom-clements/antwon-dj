from functools import wraps
from http.cookies import SimpleCookie
from typing import Callable, Dict, Any

from chalice import Blueprint, Response

from chalicelib.utils.env import ENVIRONMENT


def inject_cognito_username(route: Blueprint) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Any:
            if (ENVIRONMENT == "local") and ("authorizer" not in route.current_request.context):
                return Response(
                    body={
                        "message": "UnauthorizedAPIError."
                        "Local environment detected, have you passed an access token instead of a ID token?"
                    },
                    status_code=401,
                )
            claims = route.current_request.context["authorizer"]["claims"]
            kwargs["username"] = claims["cognito:username"] if "cognito:username" in claims else claims["username"]
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator


def inject_cookies(route: Blueprint, cookie_key: str) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Any:
            if "Cookie" not in route.current_request.headers:
                return Response(body={"message": "UnauthorizedAPIError"}, status_code=401)
            cookie_str = route.current_request.headers["Cookie"]
            cookies: SimpleCookie = SimpleCookie()
            cookies.load(cookie_str)
            try:
                cookie_value = cookies["refresh-token"].value
                kwargs[cookie_key] = cookie_value  # type: ignore
                res = f(*args, **kwargs)
            except KeyError:
                return Response(body={"message": "UnauthorizedAPIError"}, status_code=401)
            return res

        return wrapper

    return decorator
