from chalice import Blueprint
from chalicelib.endpoints.room.core import (
    get_room_guid_from_room_code,
    get_room_queue_from_room_guid,
    add_song_to_room_queue,
)

room_routes = Blueprint(__name__)


@room_routes.route("/room", methods=["GET"], cors=True)
def room_get():
    params = room_routes.current_request.query_params
    room_guid = get_room_guid_from_room_code(params["room_code"])
    return {"status": 200, "body": {"room_guid": room_guid}}


@room_routes.route("/roomQueue", methods=["GET"], cors=True)
def room_queue_get():
    params = room_routes.current_request.query_params
    room_queue = get_room_queue_from_room_guid(params["room_guid"])
    return {"status": 200, "body": {"room_queue": room_queue}}


@room_routes.route("/roomQueue", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    add_song_to_room_queue(song, room_guid)
    return {"status": 200, "body": "success"}
