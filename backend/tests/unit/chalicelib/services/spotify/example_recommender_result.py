from typing import Dict, Any

from chalicelib.models.spotify_api.recommender import SpotifyRecommenderResultSeed, SpotifyRecommenderResult
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_api_track, get_example_track


def get_example_api_recommended_seed() -> Dict[str, Any]:
    return {
        "initialPoolSize": 249,
        "afterFilteringSize": 249,
        "afterRelinkingSize": 249,
        "id": "4rrooRsDRqLwMFkDEjz5Mz",
        "type": "TRACK",
        "href": "https://api.spotify.com/v1/tracks/4rrooRsDRqLwMFkDEjz5Mz",
    }


def get_example_recommended_seed() -> SpotifyRecommenderResultSeed:
    return SpotifyRecommenderResultSeed(
        initialPoolSize=249,
        afterFilteringSize=249,
        afterRelinkingSize=249,
        id="4rrooRsDRqLwMFkDEjz5Mz",
        type="TRACK",
        href="https://api.spotify.com/v1/tracks/4rrooRsDRqLwMFkDEjz5Mz",
    )


def get_example_api_recommended() -> Dict[str, Any]:
    return {
        "tracks": [get_example_api_track(), get_example_api_track(), get_example_api_track()],
        "seeds": [
            get_example_api_recommended_seed(),
            get_example_api_recommended_seed(),
            get_example_api_recommended_seed(),
        ],
    }


def get_example_recommended() -> SpotifyRecommenderResult:
    return SpotifyRecommenderResult(
        tracks=[get_example_track(), get_example_track(), get_example_track()],
        seeds=[get_example_recommended_seed(), get_example_recommended_seed(), get_example_recommended_seed()],
    )
