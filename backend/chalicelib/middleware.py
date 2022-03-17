from aws_lambda_powertools import Logger
from chalice import Blueprint

LOGGER = Logger()

middleware = Blueprint(__name__)


@middleware.middleware("http")
def inject_route_info(event, get_response):
    LOGGER.structure_logs(append=True, request_path=event.path)
    return get_response(event)
