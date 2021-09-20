import json
import requests
from chalice import Blueprint
from ..utils.chalice import get_base_url
from ..antwondb import db_queries

watcher_routes = Blueprint(__name__)


def add_song_to_spotify_playlist(song_uri, room_guid):
    print(f"adding song: {song_uri} to room: {room_guid}")
    api = get_base_url(watcher_routes.current_request)
    spotify_api = f"{api}/spotifyAddToPlaylist"
    requests.post(
        url=spotify_api,
        json={"song_uri": song_uri, "room_guid": room_guid},
    )


def get_current_song_playing(room_guid):
    api = get_base_url(watcher_routes.current_request)
    current_playing_api = f"{api}/dev/spotifyCurrentlyPlaying?room_guid={room_guid}"
    res = requests.get(current_playing_api).json()
    current_playing = res["song"]
    return current_playing


def check_next_song(next_song, room):
    # add next song to playlist if it hasn't been added already
    if not next_song["is_added_to_playlist"]:
        print(f"adding song to playlist: {next_song}")
        add_song_to_spotify_playlist(next_song["song_uri"], room["room_guid"])
        db_queries.update_db_song_added_to_playlist(next_song["room_songs_id"])
    current_playing = get_current_song_playing(room["room_guid"])
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song["song_uri"]:
        print("updating next song to is_played")
        db_queries.update_db_add_song_played(next_song["room_songs_id"])


def song_watch(room):
    next_song = db_queries.get_next_song(room["room_id"])
    print(f"next song: {next_song}")
    # if there is a next song
    if next_song:
        check_next_song(next_song, room)


def watcher():
    active_rooms = db_queries.get_active_rooms()
    print(f"Active rooms: {active_rooms}")
    for room in active_rooms:
        song_watch(room)


@watcher_routes.lambda_function(name="watcher")
def lambda_handler(event, context):
    # TODO implement
    watcher()
    return {"statusCode": 200, "body": json.dumps("success")}
