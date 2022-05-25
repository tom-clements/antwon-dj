import json
from dataclasses import asdict
from typing import Dict, List, Any

from chalice import Blueprint

from chalicelib.cors import get_cors_config
from chalicelib.error_handling import error_handle
from chalicelib.models.cognito.user_info import CognitoUserInfoDto
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.authorizer import get_authorizer
from chalicelib.services.room.add_like import add_like_to_song
from chalicelib.services.room.add_room import owner_add_room
from chalicelib.services.room.add_to_queue import add_song_to_room_queue
from chalicelib.services.room.delete_like import delete_like_from_song
from chalicelib.services.room.delete_queue import delete_queue
from chalicelib.services.room.delete_room import owner_delete_room
from chalicelib.services.room.get_room_guid import get_room_guid
from chalicelib.services.room.get_room_info import owner_get_room
from chalicelib.services.room.get_room_queue import get_room_queue_guest, get_room_queue_user
from chalicelib.services.spotify.get_playing import get_playing
from chalicelib.services.spotify.get_search_songs import search_songs
from chalicelib.utils.endpoint_input_validation import verify_post_input, verify_parameter_inputs
from chalicelib.utils.endpoint_parameter_injection import inject_cognito_user_info

room_routes = Blueprint(__name__)


@room_routes.route("/code/{room_code}", methods=["GET"], cors=get_cors_config())
@error_handle
def room_code_get(room_code: str) -> str:
    return json.dumps(get_room_guid(room_code))


@room_routes.route("/room/{room_guid}", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@error_handle
@inject_cognito_user_info(room_routes)
def room_get(room_guid: str, user_info: CognitoUserInfoDto) -> Dict[str, Any]:
    return asdict(owner_get_room(room_guid=room_guid, username=user_info.username))


@room_routes.route("/room/{room_guid}", methods=["DELETE"], cors=get_cors_config(), authorizer=get_authorizer())
@error_handle
@inject_cognito_user_info(room_routes)
def room_delete(room_guid: str, user_info: CognitoUserInfoDto) -> None:
    owner_delete_room(room_guid=room_guid, username=user_info.username)


@room_routes.route("/room", methods=["POST"], cors=get_cors_config(), authorizer=get_authorizer())
@error_handle
@verify_post_input(room_routes, "room_code")
@inject_cognito_user_info(room_routes)
def room_add(post_body: Dict[str, Any], user_info: CognitoUserInfoDto) -> None:
    owner_add_room(room_code=post_body["room_code"], username=user_info.username)


@room_routes.route("/room/{room_guid}/queue/guest", methods=["GET"], cors=get_cors_config())
@error_handle
def room_queue_guest_get(room_guid: str) -> List[Dict[str, str]]:
    room_queue = get_room_queue_guest(room_guid)
    return [asdict(r) for r in room_queue]


@room_routes.route("/room/{room_guid}/queue/user", methods=["GET"], cors=get_cors_config(), authorizer=get_authorizer())
@error_handle
@inject_cognito_user_info(room_routes)
def room_queue_user_get(room_guid: str, user_info: CognitoUserInfoDto) -> List[Dict[str, str]]:
    room_queue = get_room_queue_user(user_info.username, room_guid)
    return [asdict(r) for r in room_queue]


@room_routes.route("/room/{room_guid}/queue", methods=["POST"], cors=get_cors_config())
@error_handle
@verify_post_input(room_routes, "song_uri", "song_name", "song_artist", "song_album_url")
def room_queue_post(room_guid: str, post_body: Dict[str, Any]) -> None:
    song = SpotifyTrackFormatted(**post_body)
    add_song_to_room_queue(song, room_guid)


@room_routes.route("/room/{room_guid}/queue", methods=["DELETE"], cors=get_cors_config(), authorizer=get_authorizer())
@error_handle
@inject_cognito_user_info(room_routes)
def room_songs_purge_post(room_guid: str, user_info: CognitoUserInfoDto) -> None:
    delete_queue(room_guid, user_info.username)


@room_routes.route(
    "/room/{room_guid}/queue/like", methods=["POST"], cors=get_cors_config(), authorizer=get_authorizer()
)
@verify_post_input(room_routes, "room_song_guid")
@error_handle
@inject_cognito_user_info(room_routes)
def room_songs_like_post(room_guid: str, post_body: Dict[str, Any], user_info: CognitoUserInfoDto) -> None:
    add_like_to_song(post_body["room_song_guid"], username=user_info.username)


@room_routes.route(
    "/room/{room_guid}/queue/like", methods=["DELETE"], cors=get_cors_config(), authorizer=get_authorizer()
)
@error_handle
@verify_post_input(room_routes, "room_song_guid")
@inject_cognito_user_info(room_routes)
def room_songs_like_delete(room_guid: str, post_body: Dict[str, Any], user_info: CognitoUserInfoDto) -> None:
    delete_like_from_song(post_body["room_song_guid"], username=user_info.username)


@room_routes.route("/room/{room_guid}/search", methods=["GET"], cors=get_cors_config())
@error_handle
@verify_parameter_inputs(room_routes, "query")
def room_search_get(room_guid: str, query_params: Dict[str, str]) -> Dict[str, List[Dict[str, str]]]:
    songs = search_songs(song_query=query_params["query"], room_guid=room_guid)
    return {"songs": [asdict(song) for song in songs]}


@room_routes.route("/room/{room_guid}/playing", methods=["GET"], cors=get_cors_config())
@error_handle
def room_playing_get(room_guid: str) -> Dict[str, Dict[str, str]]:
    return asdict(get_playing(room_guid=room_guid))
