import random
from typing import Dict, Tuple, Any
from collections import namedtuple

from chalicelib.data.read_top_room_song import read_top_room_song
from chalicelib.data.update_room_song import update_added_to_playlist, update_played
from chalicelib.services.spotify.add_to_playlist import add_to_playlist
from chalicelib.services.spotify.get_current_playing import get_currently_playing
from chalicelib.services.watcher.spotify_recommender import get_recommended_song


def check_next_song(next_song: namedtuple, room_guid: str) -> Tuple[bool, bool]:
    # add next song to playlist if it hasn't been added already
    added_to_playlist = removed_from_queue = False
    if not next_song["is_added_to_playlist"]:
        add_to_playlist(room_guid, next_song["song_uri"])
        update_added_to_playlist(next_song)
        added_to_playlist = True

    current_playing = get_currently_playing(room_guid, use_cache=False)
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song["song_uri"]:
        update_played(next_song)
        removed_from_queue = True
    return added_to_playlist, removed_from_queue


def process_next_song(next_song: Dict[str, Any], room_guid: str) -> Tuple[Dict[str, str], bool]:
    added_to_playlist, removed_from_queue = check_next_song(next_song, room_guid)
    if removed_from_queue:
        next_song, added_to_playlist = watch_room(room_guid)
    return dict(next_song), added_to_playlist


def watch_room(room_guid: str) -> Tuple[Any, bool]:
    next_song = read_top_room_song(room_guid)
    next_song = next_song if next_song else get_recommended_song(room_guid)
    # if recommended song is not None -> when no Songs have played before
    if next_song:
        return process_next_song(next_song, room_guid)
