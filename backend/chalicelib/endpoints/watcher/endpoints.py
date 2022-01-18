import json
from chalicelib.endpoints.watcher.core import poll_five_seconds, song_watch
from chalice import Blueprint, Rate


watcher_routes = Blueprint(__name__)


@watcher_routes.route("/pollRoom", methods=["GET"])
def poll_room_get():
    room_guid = watcher_routes.current_request.query_params["room_guid"]
    song_watch(room_guid)
    return {"statusCode": 200, "body": json.dumps("success")}


@watcher_routes.schedule(Rate(1, unit=Rate.MINUTES))
def poll_app(event):
    poll_five_seconds()
    return {"statusCode": 200, "body": json.dumps("success")}
