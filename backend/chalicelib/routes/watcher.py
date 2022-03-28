from chalice import Blueprint, Rate

from chalicelib.cors import get_cors_config
from chalicelib.services.watcher.get_scheduled_poll import poll_five_seconds
from chalicelib.services.watcher.watch_room import watch_room
from chalicelib.utils.env import API_URL

watcher_routes = Blueprint(__name__)


@watcher_routes.route("/room/{room_guid}/watch", methods=["GET"], cors=get_cors_config(allow_origin=API_URL))
def poll_room_get(room_guid):
    next_song, added_to_playlist = watch_room(room_guid)
    return {"next_song": next_song, "added_to_playlist": added_to_playlist}


@watcher_routes.schedule(Rate(1, unit=Rate.MINUTES))
def poll_app(event):
    poll_five_seconds()
