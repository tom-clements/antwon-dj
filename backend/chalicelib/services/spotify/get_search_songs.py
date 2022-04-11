from typing import List

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.models.spotify_api.search_result import SpotifySearchResult
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted, SpotifyTrack
from chalicelib.services.auth.spotify import use_spotify_session


def format_songs(tracks: List[SpotifyTrack]) -> List[SpotifyTrackFormatted]:
    return [
        SpotifyTrackFormatted(
            song_uri=track.uri,
            song_artist=", ".join([n.name for n in track.artists]),
            song_name=track.name,
            song_album_url=track.album.images[0].url,
        )
        for track in tracks
    ]


@use_spotify_session
def spotify_api_search(spotify_session: spotipy.Spotify, song_query: str, room_guid: str) -> SpotifySearchResult:
    return from_dict(data_class=SpotifySearchResult, data=spotify_session.search(q=song_query, type="track"))


def search_songs(song_query: str, room_guid: str) -> List[SpotifyTrackFormatted]:
    result = spotify_api_search(song_query=song_query, room_guid=room_guid)
    return format_songs(result.tracks.items)
