from dataclasses import asdict
from typing import Any, Union, Dict

from chalice import Blueprint, Rate
from chalice.app import Request

from chalicelib.cors import get_cors_config
from chalicelib.error_handling import error_handle
from chalicelib.services.watcher.get_scheduled_poll import poll_five_seconds
from chalicelib.services.watcher.watch_room import watch_room
from chalicelib.utils.env import API_URL

watcher_routes = Blueprint(__name__)


@watcher_routes.route("/room/{room_guid}/watch", methods=["GET"], cors=get_cors_config(allow_origin=API_URL))
@error_handle
def poll_room_get(room_guid: str) -> Dict[str, Union[bool, Any]]:
    next_song, added_to_playlist = watch_room(room_guid)
    return_song = asdict(next_song) if next_song else next_song
    return {"next_song": return_song, "added_to_playlist": added_to_playlist}


@watcher_routes.schedule(Rate(1, unit=Rate.MINUTES))
def poll_app(event: Request) -> None:
    poll_five_seconds(local_polling=True)
