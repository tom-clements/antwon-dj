import json
import os
import json
import traceback
import requests
import antwondb


def add_song_to_spotify_playlist(song_uri, room_guid):
    print(f"adding song: {song_uri} to room: {room_guid}")
    spotify_api = "https://m5ua2jc51a.execute-api.eu-west-2.amazonaws.com/dev/spotifyAddToPlaylist"
    requests.post(
        url=spotify_api, json={"song_uri": song_uri, "room_guid": room_guid},
    )


def get_current_song_playing(room_guid):
    current_playing_api = (
        f"https://m5ua2jc51a.execute-api.eu-west-2.amazonaws.com/dev/spotifyCurrentlyPlaying?room_guid={room_guid}"
    )
    res = requests.get(current_playing_api).json()
    current_playing = res["song"]
    return current_playing


def check_next_song(next_song, room):
    # add next song to playlist if it hasn't been added already
    if not next_song["is_added_to_playlist"]:
        print(f"adding song to playlist: {next_song}")
        add_song_to_spotify_playlist(next_song["song_uri"], room["room_guid"])
        antwondb.db_queries.update_db_song_added_to_playlist(next_song["room_songs_id"])
    current_playing = get_current_song_playing(room["room_guid"])
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song["song_uri"]:
        print("updating next song to is_played")
        antwondb.db_queries.update_db_add_song_played(next_song["room_songs_id"])


def song_watch(room):
    next_song = antwondb.db_queries.get_next_song(room["room_id"])
    print(f"next song: {next_song}")
    # if there is a next song
    if next_song:
        check_next_song(next_song, room)


def watcher():
    active_rooms = antwondb.db_queries.get_active_rooms()
    print(f"Active rooms: {active_rooms}")
    for room in active_rooms:
        song_watch(room)


def lambda_handler(event, context):
    # TODO implement
    watcher()
    return {"statusCode": 200, "body": json.dumps("success")}
