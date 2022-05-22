from functools import wraps
from typing import Callable, Any, Dict

from chalice import Response

from chalicelib.services.exceptions import (
    NotFoundServiceError,
    ForbiddenServiceError,
    ConflictServiceError,
    ServiceError,
)


def error_response(status_code: int, error: ServiceError) -> Response:
    return Response(
        status_code=status_code,
        body={"Code": error.__class__.__name__.replace("Service", "API"), "Message": str(error)},
        headers={"Content-Type": "application/json"},
    )


def error_handle(f: Callable) -> Callable:
    @wraps(f)
    def decorated(*args: Any, **kwargs: Dict[str, Any]) -> Any:
        try:
            return f(*args, **kwargs)
        except ForbiddenServiceError as e:
            return error_response(status_code=403, error=e)
        except NotFoundServiceError as e:
            return error_response(status_code=404, error=e)
        except ConflictServiceError as e:
            return error_response(status_code=409, error=e)

    return decorated
