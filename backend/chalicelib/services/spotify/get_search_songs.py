from typing import List, Dict, Any

import spotipy

from chalicelib.services.auth.spotify import use_spotify_session


def format_songs(songs: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    return [
        {
            "song_uri": r["uri"],
            "song_artist": ", ".join([n["name"] for n in r["artists"]]),
            "song_name": r["name"],
            "song_album_url": r["album"]["images"][0]["url"],
        }
        for i, r in enumerate(songs)
    ]


@use_spotify_session
def search_songs(spotify_session: spotipy.Spotify, song_query: str, room_guid: str) -> List[Dict[str, str]]:
    result = spotify_session.search(q=song_query, type="track")
    return format_songs(result["tracks"]["items"])
