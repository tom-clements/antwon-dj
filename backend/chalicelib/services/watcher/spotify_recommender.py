from typing import List, Dict, Any

import spotipy

from chalicelib.data.read_room_queue import read_last_five_played_tracked
from chalicelib.data.read_top_room_song import read_top_room_song
from chalicelib.services.room.add_to_queue import add_song_to_room_queue
from chalicelib.services.spotify.get_search_songs import format_songs
from chalicelib.services.auth.spotify import use_spotify_session


@use_spotify_session
def get_spotify_recommended_song(previous_track_uris: List[str], spotify_session: spotipy.Spotify, room_guid: str):
    songs_result = spotify_session.recommendations(seed_tracks=previous_track_uris, country="GB", limit=1)
    return format_songs(songs_result["tracks"])[0]


def get_recommended_song(room_guid: str) -> Dict[str, Any]:
    previous_track_uris = read_last_five_played_tracked(room_guid)
    song = get_spotify_recommended_song(previous_track_uris, room_guid=room_guid)
    add_song_to_room_queue(song, room_guid)
    return read_top_room_song(room_guid)
