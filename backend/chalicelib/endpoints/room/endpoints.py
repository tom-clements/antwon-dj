from chalice import Blueprint
from chalicelib.endpoints.room.core import (
    get_room_guid_from_room_code,
    get_room_queue_from_room_guid,
    add_song_to_room_queue,
    purge_room_songs,
    add_like_to_song,
    remove_like_from_song,
    delete_room,
    check_room_delete_permissions,
)
from chalicelib.utils.auth import get_authorizer

room_routes = Blueprint(__name__)


@room_routes.route("/room", methods=["GET"], cors=True)
def room_get():
    params = room_routes.current_request.query_params
    room_guid = get_room_guid_from_room_code(params["room_code"])
    return {"room_guid": room_guid}


@room_routes.route("/room", methods=["DELETE"], cors=True, authorizer=get_authorizer())
def room_delete():
    params = room_routes.current_request.query_params
    username = room_routes.current_request.context["authorizer"]["claims"]["username"]
    check_room_delete_permissions(params["room_guid"], username)
    delete_room(room_guid=params["room_guid"])


@room_routes.route("/roomQueue", methods=["GET"], cors=True)
def room_queue_get():
    params = room_routes.current_request.query_params
    room_queue = get_room_queue_from_room_guid(params["room_guid"])
    room_queue = sorted([dict(r) for r in room_queue], key=lambda x: x["insert_time"])
    return {"room_queue": room_queue}


@room_routes.route("/roomQueue", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    add_song_to_room_queue(song, room_guid)


@room_routes.route("/roomSongsPurge", methods=["POST"], cors=True)
def room_songs_purge_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    purge_room_songs(room_guid)


@room_routes.route("/roomSongsLike", methods=["POST"], cors=True)
def room_songs_like_post():
    body = room_routes.current_request.json_body
    if body["is_liked"]:
        add_like_to_song(body["room_song_guid"], token=body["token"])
    else:
        remove_like_from_song(body["room_song_guid"], token=body["token"])
