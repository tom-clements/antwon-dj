import json
import asyncio
import time
import aiohttp
import requests
from chalice import Blueprint, Rate
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
    current_playing_api = f"{api}/spotifyCurrentlyPlaying?room_guid={room_guid}"
    res = requests.get(current_playing_api).json()
    current_playing = res["song"]
    return current_playing


def check_next_song(next_song, room_guid):
    # add next song to playlist if it hasn't been added already
    if not next_song["is_added_to_playlist"]:
        print(f"adding song to playlist: {next_song}")
        add_song_to_spotify_playlist(next_song["song_uri"], room_guid)
        db_queries.update_db_song_added_to_playlist(next_song["room_songs_id"])
    current_playing = get_current_song_playing(room_guid)
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song["song_uri"]:
        print("updating next song to is_played")
        db_queries.update_db_add_song_played(next_song["room_songs_id"])


def song_watch(room_guid):
    next_song = db_queries.get_next_song(room_guid)
    print(f"next song: {next_song}")
    # if there is a next song
    if next_song:
        check_next_song(next_song, room_guid)


@watcher_routes.route("/pollRoom", methods=["GET"])
def poll_room_get():
    room_guid = watcher_routes.current_request.query_params['room_guid']
    song_watch(room_guid)
    return {"statusCode": 200, "body": json.dumps("success")}


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()


async def poll_rooms(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        await asyncio.gather(*tasks)

def poll_five_seconds():
    for i in range(10):
        active_rooms = db_queries.get_active_rooms()
        room_guids = [room['room_guid'] for room in active_rooms]
        print(f"Active rooms: {room_guids}")
        api = get_base_url(watcher_routes.current_request)
        urls = [f"{api}/pollRoom?room_guid={room_guid}" for room_guid in room_guids]
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(poll_rooms(urls))
        time.sleep(5)
        break


@watcher_routes.schedule(Rate(1, unit=Rate.MINUTES))
def poll_app():
    poll_five_seconds()
    return {"statusCode": 200, "body": json.dumps("success")}
