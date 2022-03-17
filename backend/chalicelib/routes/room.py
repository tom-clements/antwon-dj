from typing import Dict, Union, List

from chalice import Blueprint, Response

from chalicelib.services.auth.cognito import get_authorizer
from chalicelib.services.room.add_like import add_like_to_song
from chalicelib.services.room.add_room import owner_add_room
from chalicelib.services.room.add_to_queue import add_song_to_room_queue
from chalicelib.services.room.delete_like import delete_like_from_song
from chalicelib.services.room.delete_queue import delete_queue
from chalicelib.services.room.delete_room import owner_delete_room
from chalicelib.data.read_one_queries import get_room_guid_from_room_code
from chalicelib.services.room.get_room_queue import get_room_queue_from_room_guid

room_routes = Blueprint(__name__)


@room_routes.route("/room", methods=["GET"], cors=True)
def room_get() -> Dict[str, str]:
    params = room_routes.current_request.query_params
    room_guid = get_room_guid_from_room_code(params["room_code"])
    return {"room_guid": room_guid}


@room_routes.route("/room", methods=["DELETE"], cors=True, authorizer=get_authorizer())
def room_delete() -> Union[Response, None]:
    params = room_routes.current_request.query_params
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    return owner_delete_room(room_guid=params["room_guid"], username=username)


@room_routes.route("/room", methods=["POST"], cors=True, authorizer=get_authorizer())
def room_add() -> Union[Response, None]:
    room_code = room_routes.current_request.json_body["room_code"]
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    return owner_add_room(room_code=room_code, username=username)


@room_routes.route("/roomQueue", methods=["GET"], cors=True)
def room_queue_get() -> Dict[str, List[Dict[str, str]]]:
    params = room_routes.current_request.query_params
    room_queue = get_room_queue_from_room_guid(params["room_guid"])
    room_queue = sorted([dict(r) for r in room_queue], key=lambda x: x["insert_time"])
    return {"room_queue": room_queue}


@room_routes.route("/roomQueue", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    add_song_to_room_queue(song, room_guid)


@room_routes.route("/room/queue", methods=["DELETE"], cors=True, authorizer=get_authorizer())
def room_songs_purge_post():
    params = room_routes.current_request.query_params
    delete_queue(params["room_guid"])


@room_routes.route("/room/song/like", methods=["POST"], cors=True, authorizer=get_authorizer())
def room_songs_like_post():
    body = room_routes.current_request.json_body
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    if body["is_liked"]:
        return add_like_to_song(body["room_song_guid"], username=username)
    else:
        return delete_like_from_song(body["room_song_guid"], username=username)
