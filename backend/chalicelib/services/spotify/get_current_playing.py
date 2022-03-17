from functools import lru_cache
from typing import Dict, Union, Any

import spotipy

from chalicelib.services.spotify.get_search_songs import format_songs
from chalicelib.services.auth.spotify import use_spotify_session
from chalicelib.utils.get_ttl_hash import get_ttl_hash


@lru_cache(maxsize=1000)
@use_spotify_session
def spotify_currently_playing_cached(
    room_guid: str, ttl_hash: int, spotify_session: spotipy.Spotify
) -> Union[Dict[str, Any], None]:
    return spotify_session.currently_playing()


@use_spotify_session
def spotify_currently_playing_uncached(room_guid: str, spotify_session: spotipy.Spotify) -> Union[Dict[str, Any], None]:
    return spotify_session.currently_playing()


def is_currently_playing_a_song(currently_playing: Union[Dict[str, Any], None]) -> bool:
    if currently_playing:
        # if track is a song, there is information populated in item
        return bool(currently_playing["item"])
    else:
        # no track playing
        return False


def get_placeholder_empty_song() -> Dict[str, str]:
    return {
        "id": "1",
        "song_uri": "a",
        "song_artist": "Add Songs to Queue",
        "song_name": "No Song Playing",
        "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    }


def get_currently_playing(room_guid: str, use_cache=True) -> Dict[str, str]:
    if use_cache:
        currently_playing = spotify_currently_playing_cached(room_guid=room_guid, ttl_hash=get_ttl_hash())
    else:
        currently_playing = spotify_currently_playing_uncached(room_guid=room_guid)
    if is_currently_playing_a_song(currently_playing):
        return format_songs([currently_playing["item"]])[0]
    else:
        return get_placeholder_empty_song()
