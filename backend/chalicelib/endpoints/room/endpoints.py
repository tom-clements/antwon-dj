from chalice import Blueprint, BadRequestError
from chalicelib.endpoints.room.core import (
    get_room_guid_from_room_code,
    get_room_queue_from_room_guid,
    add_song_to_room_queue,
    purge_room_songs,
    add_like_to_song,
    remove_like_from_song,
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
    return {"status": 200, "body": {"room_queue": [dict(r) for r in room_queue]}}


@room_routes.route("/roomQueue", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    add_song_to_room_queue(song, room_guid)
    return {"status": 200, "body": "success"}


@room_routes.route("/roomSongsPurge", methods=["POST"], cors=True)
def room_queue_post():
    song = room_routes.current_request.json_body
    room_guid = song.pop("room_guid")
    purge_room_songs(room_guid)
    return {"status": 200, "body": "success"}


@room_routes.route("/roomSongsLike", methods=["POST"], cors=True)
@authenticate_user
@error_handle
def room_songs_like_post():
    body = room_routes.current_request.json_body
    if body["is_liked"]:
        add_like_to_song(body["room_song_guid"], token=body["token"])
    else:
        remove_like_from_song(body["room_song_guid"], token=body["token"])
    return {"status": 200, "body": "success"}
