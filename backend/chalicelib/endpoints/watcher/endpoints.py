import json
from chalicelib.endpoints.watcher.core import poll_five_seconds, song_watch
from chalice import Blueprint, Rate


watcher_routes = Blueprint(__name__)


@watcher_routes.route("/pollRoom", methods=["GET"])
def poll_room_get():
    room_guid = watcher_routes.current_request.query_params["room_guid"]
    next_song, added_to_playlist, removed_from_queue = song_watch(room_guid)
    body = {"next_song": next_song, "added_to_playlist": added_to_playlist, "removed_from_queue": removed_from_queue}
    return {"statusCode": 200, "body": body}


@watcher_routes.schedule(Rate(1, unit=Rate.MINUTES))
def poll_app(event):
    poll_five_seconds()
    return {"statusCode": 200, "body": json.dumps("success")}
