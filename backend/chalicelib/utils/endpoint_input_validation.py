from functools import wraps
from typing import Callable, Dict, Any

from chalice import BadRequestError, Blueprint


def verify_parameter_inputs(route: Blueprint, *parameter_args: str) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, str]) -> Callable:
            query_params = route.current_request.query_params
            if not query_params:
                raise BadRequestError(f"No Parameters Given: Expected: {parameter_args}")
            for parameter in parameter_args:
                if parameter not in query_params:
                    raise BadRequestError(f"No {parameter} parameter given.")
            kwargs["query_params"] = query_params
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator


def verify_post_input(route: Blueprint, *post_keys: str) -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(*args: str, **kwargs: Dict[str, str]) -> Any:
            post_body = route.current_request.json_body
            if not post_body:
                raise BadRequestError(f"No Post Body Given: Expected: {post_keys}")
            for key in post_keys:
                if key not in post_body:
                    raise BadRequestError(f"No {key} key given in body.")
            kwargs["post_body"] = post_body
            res = f(*args, **kwargs)
            return res

        return wrapper

    return decorator
