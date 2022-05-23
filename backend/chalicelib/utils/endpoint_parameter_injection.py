from functools import wraps
from typing import Callable, Dict, Any

from chalice import Blueprint

from chalicelib.utils.env import ENVIRONMENT


def user_auth_token(route: Blueprint) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Callable:
            if ENVIRONMENT == "local":
                authorization = route.current_request.headers["local_authorization"]
            else:
                authorization = route.current_request.headers["authorization"]
            kwargs["token_type"] = authorization.split(" ")[0]
            kwargs["token"] = authorization.split(" ")[-1]
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator


def user_username(route: Blueprint) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Any:
            if ENVIRONMENT == "local":
                username = route.current_request.context["authorizer"]["claims"]["cognito:username"]
            else:
                username = route.current_request.context["authorizer"]["claims"]["username"]
            kwargs["username"] = username
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator
