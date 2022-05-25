from functools import lru_cache
from typing import Optional

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.models.spotify_api.playing_result import SpotifyPlaying
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.spotify.get_search_songs import format_songs
from chalicelib.services.spotify.auth import use_spotify_session
from chalicelib.services.utils.verify_room import verify_room_exists
from chalicelib.utils.get_ttl_hash import get_ttl_hash


@lru_cache(maxsize=1000)
@use_spotify_session
def _spotify_playing_cached(
    room_guid: str, ttl_hash: int, spotify_session: spotipy.Spotify
) -> Optional[SpotifyPlaying]:
    playing = spotify_session.currently_playing()
    if playing:
        return from_dict(data_class=SpotifyPlaying, data=playing)
    else:
        return None


@use_spotify_session
def _spotify_playing_uncached(room_guid: str, spotify_session: spotipy.Spotify) -> Optional[SpotifyPlaying]:
    playing = spotify_session.currently_playing()
    if playing:
        return from_dict(data_class=SpotifyPlaying, data=playing)
    else:
        return None


def _is_playing_a_song(playing: Optional[SpotifyPlaying]) -> bool:
    if playing:
        # if track is a song, there is information populated in item
        return bool(playing.item)
    else:
        # no track playing
        return False


def _get_placeholder_empty_song() -> SpotifyTrackFormatted:
    return SpotifyTrackFormatted(
        song_uri="empty_song_uri",
        song_artist="Add Songs to Queue",
        song_name="No Song Playing",
        song_album_url="https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    )


@verify_room_exists
def get_playing(room_guid: str, use_cache: bool = True) -> SpotifyTrackFormatted:
    if use_cache:
        playing = _spotify_playing_cached(room_guid=room_guid, ttl_hash=get_ttl_hash())
    else:
        playing = _spotify_playing_uncached(room_guid=room_guid)
    if _is_playing_a_song(playing):
        return format_songs([playing.item])[0]
    else:
        return _get_placeholder_empty_song()
