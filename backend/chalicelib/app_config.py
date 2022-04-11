import logging

from chalice import ConvertToMiddleware, Chalice
from aws_lambda_powertools import Logger
from aws_lambda_powertools import Tracer

from chalicelib.middleware import middleware
from chalicelib.routes.room import room_routes
from chalicelib.routes.spotify import spotify_routes
from chalicelib.routes.swagger import swagger_routes
from chalicelib.routes.user import user_routes
from chalicelib.routes.watcher import watcher_routes

LOGGER = Logger()
TRACER = Tracer()


def register_blueprints(app: Chalice) -> None:
    app.register_blueprint(room_routes)
    app.register_blueprint(spotify_routes)
    app.register_blueprint(user_routes)
    app.register_blueprint(watcher_routes)
    app.register_blueprint(swagger_routes)


def register_middleware(app: Chalice) -> None:
    app.register_middleware(ConvertToMiddleware(LOGGER.inject_lambda_context))  # type: ignore
    app.register_middleware(ConvertToMiddleware(TRACER.capture_lambda_handler))  # type: ignore
    app.register_blueprint(middleware)


def set_log_level(app: Chalice) -> None:
    app.log.setLevel(logging.INFO)


def setup_app() -> Chalice:
    chalice_app = Chalice(app_name="backend", debug=True)
    set_log_level(chalice_app)
    register_blueprints(chalice_app)
    register_middleware(chalice_app)
    return chalice_app
