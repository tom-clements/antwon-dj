from typing import List, Optional

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.data.queue.read_room_queue import read_last_five_played_tracked
from chalicelib.data.queue.read_next_song import read_next_song
from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.models.spotify_api.recommender import SpotifyRecommenderResult
from chalicelib.services.room.add_to_queue import add_song_to_room_queue
from chalicelib.services.spotify.get_search_songs import format_songs
from chalicelib.services.auth.spotify import use_spotify_session


@use_spotify_session
def _get_spotify_recommended_song(
    previous_track_uris: List[str], spotify_session: spotipy.Spotify, room_guid: str
) -> SpotifyRecommenderResult:
    return from_dict(
        data_class=SpotifyRecommenderResult,
        data=spotify_session.recommendations(seed_tracks=previous_track_uris, country="GB", limit=1),
    )


def get_recommended_song(room_guid: str) -> Optional[NextSong]:
    previous_track_uris = read_last_five_played_tracked(room_guid)
    if not previous_track_uris:
        return None
    song = _get_spotify_recommended_song(previous_track_uris, room_guid=room_guid)
    song_formatted = format_songs(song.tracks)[0]
    add_song_to_room_queue(song_formatted, room_guid)
    return read_next_song(room_guid)
