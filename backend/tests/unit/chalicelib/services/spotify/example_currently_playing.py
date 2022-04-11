from typing import Dict, Any

from chalicelib.models.spotify_api.currently_playing_result import (
    SpotifyCurrentlyPlaying,
)
from tests.unit.chalicelib.services.spotify.example_tracks import get_example_track, get_example_api_track


def get_example_current_playing_podcast() -> SpotifyCurrentlyPlaying:
    return SpotifyCurrentlyPlaying(
        timestamp=1649682580058,
        context=None,
        progress_ms=5461000,
        item=None,
        currently_playing_type="episode",
        actions={"disallows": {"resuming": True}},
        is_playing=True,
    )


def get_example_current_playing_podcast_api() -> Dict[str, Any]:
    return {
        "timestamp": 1649682580058,
        "context": None,
        "progress_ms": 5461000,
        "item": None,
        "currently_playing_type": "episode",
        "actions": {"disallows": {"resuming": True}},
        "is_playing": True,
    }


def get_example_current_playing(uri: str = "spotify:track:6N1K5OVVCopBjGViHs2IvP") -> SpotifyCurrentlyPlaying:
    return SpotifyCurrentlyPlaying(
        timestamp=1649694500715,
        context=None,
        progress_ms=81155,
        item=get_example_track(uri=uri),
        currently_playing_type="track",
        actions={"disallows": {"resuming": True, "skipping_prev": True}},
        is_playing=True,
    )


def get_example_current_playing_api(uri: str = "spotify:track:6N1K5OVVCopBjGViHs2IvP") -> Dict[str, Any]:
    return {
        "timestamp": 1649694500715,
        "context": None,
        "progress_ms": 81155,
        "item": get_example_api_track(uri=uri),
        "currently_playing_type": "track",
        "actions": {"disallows": {"resuming": True, "skipping_prev": True}},
        "is_playing": True,
    }
