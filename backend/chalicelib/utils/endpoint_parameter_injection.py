from dataclasses import fields
from functools import wraps
from typing import Callable, Dict, Any

from chalice import Blueprint

from chalicelib.models.cognito.user_info import CognitoUserInfoDto


def inject_cognito_user_info(route: Blueprint) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Any:
            claims = route.current_request.context["authorizer"]["claims"]
            claims["username"] = claims["cognito:username"] if "cognito:username" in claims else claims["username"]
            user_fields = {field.name: claims[field.name] for field in fields(CognitoUserInfoDto)}
            kwargs["user_info"] = CognitoUserInfoDto(**user_fields)  # type: ignore
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator
