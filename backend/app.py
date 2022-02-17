import logging

from chalice import Chalice
from chalice.app import ConvertToMiddleware
from aws_lambda_powertools import Logger
from aws_lambda_powertools import Tracer

from chalicelib.endpoints.room.endpoints import room_routes
from chalicelib.endpoints.spotify.endpoints import spotify_routes
from chalicelib.endpoints.watcher.endpoints import watcher_routes

app = Chalice(app_name="backend")
app.register_blueprint(room_routes)
app.register_blueprint(spotify_routes)
app.register_blueprint(watcher_routes)
app.log.setLevel(logging.INFO)
logger = Logger()
tracer = Tracer()

app.register_middleware(ConvertToMiddleware(logger.inject_lambda_context))
app.register_middleware(ConvertToMiddleware(tracer.capture_lambda_handler))


@app.middleware("http")
def inject_route_info(event, get_response):
    logger.structure_logs(append=True, request_path=event.path)
    return get_response(event)
