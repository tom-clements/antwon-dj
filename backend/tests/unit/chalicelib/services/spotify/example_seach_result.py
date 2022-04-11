from typing import List, Dict, Any

from chalicelib.models.spotify_api.search_result import SpotifySearchResultTracks, SpotifySearchResult
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from tests.unit.chalicelib.services.spotify.example_tracks import (
    get_example_track,
    get_example_track_formatted,
    get_example_api_track,
)


def get_example_search_api_no_result() -> Dict[str, Any]:
    return {
        "tracks": {
            "href": "https://api.spotify.com/v1/search?query=example_song_query_with_no_results&type=track&offset=0"
            "&limit=10",
            "items": [],
            "limit": 10,
            "next": None,
            "offset": 0,
            "previous": None,
            "total": 0,
        }
    }


def get_example_search_no_result() -> SpotifySearchResult:
    return SpotifySearchResult(
        tracks=SpotifySearchResultTracks(
            href="https://api.spotify.com/v1/search?query=example_song_query_with_no_results&type=track&offset=0"
            "&limit=10",
            items=[],
            limit=10,
            next=None,
            offset=0,
            previous=None,
            total=0,
        )
    )


def get_example_api_search_result() -> Dict[str, Dict[str, Any]]:
    return {
        "tracks": {
            "href": "https://api.spotify.com/v1/search?query=taylor&type=track&offset=0&limit=10",
            "items": [get_example_api_track(), get_example_api_track(), get_example_api_track()],
            "limit": 10,
            "next": "https://api.spotify.com/v1/search?query=taylor&type=track&offset=10&limit=10",
            "offset": 0,
            "previous": None,
            "total": 10183,
        }
    }


def get_example_search_result() -> SpotifySearchResult:
    return SpotifySearchResult(
        tracks=SpotifySearchResultTracks(
            href="https://api.spotify.com/v1/search?query=taylor&type=track&offset=0&limit=10",
            items=[get_example_track(), get_example_track(), get_example_track()],
            limit=10,
            next="https://api.spotify.com/v1/search?query=taylor&type=track&offset=10&limit=10",
            offset=0,
            previous=None,
            total=10183,
        )
    )


def get_example_search_result_formatted() -> List[SpotifyTrackFormatted]:
    return [get_example_track_formatted(), get_example_track_formatted(), get_example_track_formatted()]
