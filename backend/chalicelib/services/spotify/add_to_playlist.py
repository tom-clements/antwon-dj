from typing import Optional, List

import spotipy  # type: ignore

from chalicelib.data.read_room_info import read_spotify_room_info
from chalicelib.models.spotify_api.playlist import SpotifyPlaylist
from chalicelib.services.auth.spotify import use_spotify_session
from chalicelib.services.spotify.get_playlists import retrieve_playlists_from_room_guid
from chalicelib.services.utils.verify_room import verify_room_exists


@use_spotify_session
def _create_playlist(
    playlist_name: str, spotify_user_username: str, room_guid: str, spotify_session: spotipy.Spotify
) -> None:
    spotify_session.user_playlist_create(
        spotify_user_username, playlist_name, public=True, collaborative=False, description=""
    )


def _get_playlist(playlist_name: str, room_guid: str) -> Optional[SpotifyPlaylist]:
    playlists = retrieve_playlists_from_room_guid(room_guid=room_guid)
    playlist_list = [playlist for playlist in playlists if playlist.name == playlist_name]
    return playlist_list[0] if playlist_list else None


@use_spotify_session
def _add_to_spotify_playlist(
    playlist_id: str, items: List[str], room_guid: str, spotify_session: spotipy.Spotify
) -> None:
    spotify_session.playlist_add_items(playlist_id=playlist_id, items=items)


@verify_room_exists
def add_to_playlist(room_guid: str, song_uri: str) -> None:
    room_info = read_spotify_room_info(room_guid)
    playlist = _get_playlist(f"ANTWON-{room_info.room_code}", room_guid=room_guid)
    if not playlist:
        _create_playlist(f"ANTWON-{room_info.room_code}", room_info.spotify_user_username, room_guid=room_guid)
        add_to_playlist(room_guid, song_uri)
    else:
        _add_to_spotify_playlist(playlist.id, [song_uri], room_guid=room_guid)
