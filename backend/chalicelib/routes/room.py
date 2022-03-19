from typing import Dict, Union, List

from chalice import Blueprint, Response

from chalicelib.cors import get_cors_config
from chalicelib.data.read_scalar_queries import get_room_guid_from_room_code
from chalicelib.services.auth.cognito import get_authorizer
from chalicelib.services.room.add_like import add_like_to_song
from chalicelib.services.room.add_room import owner_add_room
from chalicelib.services.room.add_to_queue import add_song_to_room_queue
from chalicelib.services.room.delete_like import delete_like_from_song
from chalicelib.services.room.delete_queue import delete_queue
from chalicelib.services.room.delete_room import owner_delete_room
from chalicelib.services.room.get_room_queue import get_room_queue_from_room_code

room_routes = Blueprint(__name__)


@room_routes.route("/code/{room_code}", methods=["GET"], cors=get_cors_config())
def room_get(room_code) -> Dict[str, str]:
    room_guid = get_room_guid_from_room_code(room_code)
    return {"room_guid": room_guid}


@room_routes.route("/room/{room_guid}", methods=["DELETE"], cors=get_cors_config(), authorizer=get_authorizer())
def room_delete(room_guid) -> Union[Response, None]:
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    return owner_delete_room(room_guid=room_guid, username=username)


@room_routes.route("/room", methods=["POST"], cors=get_cors_config(), authorizer=get_authorizer())
def room_add() -> Union[Response, None]:
    room_code = room_routes.current_request.json_body["room_code"]
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    return owner_add_room(room_code=room_code, username=username)


@room_routes.route("/room/{room_guid}/queue", methods=["GET"], cors=get_cors_config())
def room_queue_get(room_guid) -> Dict[str, List[Dict[str, str]]]:
    room_queue = get_room_queue_from_room_code(room_guid)
    return {"room_queue": room_queue}


@room_routes.route("/room/{room_guid}/queue", methods=["POST"], cors=get_cors_config())
def room_queue_post(room_guid):
    song = room_routes.current_request.json_body
    add_song_to_room_queue(song, room_guid)


@room_routes.route("/room/{room_guid}/queue", methods=["DELETE"], cors=get_cors_config(), authorizer=get_authorizer())
def room_songs_purge_post(room_guid):
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    delete_queue(room_guid, username)


@room_routes.route(
    "/room/{room_guid}/queue/like", methods=["POST"], cors=get_cors_config(), authorizer=get_authorizer()
)
def room_songs_like_post(room_guid):
    body = room_routes.current_request.json_body
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    if body["is_liked"]:
        return add_like_to_song(body["room_song_guid"], username=username)
    else:
        return delete_like_from_song(body["room_song_guid"], username=username)
