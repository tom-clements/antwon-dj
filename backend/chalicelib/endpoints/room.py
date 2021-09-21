from ..antwondb import db_queries
from chalice import Blueprint


room_routes = Blueprint(__name__)


@room_routes.route("/room", methods=["GET"], cors=True)
def room_get():
    params = room_routes.current_request.query_params
    room_guid = db_queries.get_room_guid_from_code(params["room_code"])
    return {"status": 200, "body": {"room_guid": room_guid}}


@room_routes.route("/roomQueue", methods=["GET"], cors=True)
def room_queue_get():
    params = room_routes.current_request.query_params
    room_queue = db_queries.get_room_queue(params["room_guid"])
    return {"status": 200, "body": room_queue}


@room_routes.route("/roomQueue", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.raw_body.decode()
    room_queue = db_queries.store_song_in_queue(song)
    return {"status": 200, "body": "success"}
