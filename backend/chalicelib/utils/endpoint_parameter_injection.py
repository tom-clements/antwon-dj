from dataclasses import fields
from functools import wraps
from http.cookies import SimpleCookie
from typing import Callable, Dict, Any

from chalice import Blueprint, Response

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


def inject_cookies(route: Blueprint, cookie_key: str) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, Any]) -> Any:
            if "Cookie" not in route.current_request.headers:
                return Response(body={"message": "Unauthorized"}, status_code=403)
            cookie_str = route.current_request.headers["Cookie"]
            cookies: SimpleCookie = SimpleCookie()
            cookies.load(cookie_str)
            try:
                cookie_value = cookies["refresh-token"].value
                kwargs[cookie_key] = cookie_value  # type: ignore
                res = f(*args, **kwargs)
            except KeyError:
                return Response(body={"message": "Unauthorized"}, status_code=403)
            return res

        return wrapper

    return decorator
