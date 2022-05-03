from functools import wraps
from typing import Callable, Any, Dict

from chalice import Response

from chalicelib.services.exceptions import NotFoundServiceError, ForbiddenServiceError, ConflictServiceError


def error_response(status_code: int, error_string: str) -> Response:
    return Response(status_code=status_code, body=error_string, headers={"Content-Type": "text/plain"})


def error_handle(f: Callable) -> Callable:
    @wraps(f)
    def decorated(*args: Any, **kwargs: Dict[str, Any]) -> Any:
        try:
            return f(*args, **kwargs)
        except ForbiddenServiceError as e:
            return error_response(status_code=403, error_string=str(e))
        except NotFoundServiceError as e:
            return error_response(status_code=404, error_string=str(e))
        except ConflictServiceError as e:
            return error_response(status_code=409, error_string=str(e))
        except Exception:
            raise

    return decorated
