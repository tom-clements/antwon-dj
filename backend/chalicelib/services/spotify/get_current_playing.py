from functools import lru_cache
from typing import Optional

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.data.is_exists import is_room_exists
from chalicelib.models.spotify_api.currently_playing_result import SpotifyCurrentlyPlaying
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.exceptions import RoomNotFoundServiceError
from chalicelib.services.spotify.get_search_songs import format_songs
from chalicelib.services.auth.spotify import use_spotify_session
from chalicelib.utils.get_ttl_hash import get_ttl_hash


@lru_cache(maxsize=1000)
@use_spotify_session
def _spotify_currently_playing_cached(
    room_guid: str, ttl_hash: int, spotify_session: spotipy.Spotify
) -> Optional[SpotifyCurrentlyPlaying]:
    current_playing = spotify_session.currently_playing()
    if current_playing:
        return from_dict(data_class=SpotifyCurrentlyPlaying, data=current_playing)
    else:
        return None


@use_spotify_session
def _spotify_currently_playing_uncached(
    room_guid: str, spotify_session: spotipy.Spotify
) -> Optional[SpotifyCurrentlyPlaying]:
    current_playing = spotify_session.currently_playing()
    if current_playing:
        return from_dict(data_class=SpotifyCurrentlyPlaying, data=current_playing)
    else:
        return None


def _is_currently_playing_a_song(currently_playing: Optional[SpotifyCurrentlyPlaying]) -> bool:
    if currently_playing:
        # if track is a song, there is information populated in item
        return bool(currently_playing.item)
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


def get_currently_playing(room_guid: str, use_cache: bool = True) -> SpotifyTrackFormatted:
    if not is_room_exists(room_guid):
        raise RoomNotFoundServiceError(room_guid)
    if use_cache:
        currently_playing = _spotify_currently_playing_cached(room_guid=room_guid, ttl_hash=get_ttl_hash())
    else:
        currently_playing = _spotify_currently_playing_uncached(room_guid=room_guid)
    if _is_currently_playing_a_song(currently_playing):
        return format_songs([currently_playing.item])[0]
    else:
        return _get_placeholder_empty_song()
