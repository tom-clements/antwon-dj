from collections import Callable

from aws_lambda_powertools import Logger
from chalice import Blueprint
from chalice.app import Request, Response

LOGGER = Logger()

middleware = Blueprint(__name__)


@middleware.middleware("http")
def inject_route_info(event: Request, get_response: Callable) -> Response:
    LOGGER.structure_logs(append=True, request_path=event.path)
    return get_response(event)
