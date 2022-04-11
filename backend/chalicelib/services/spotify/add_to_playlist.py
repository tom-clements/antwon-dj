from typing import Optional, List

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.data.read_room_info import read_room_info
from chalicelib.models.spotify_api.playlist import SpotifyPlaylist
from chalicelib.services.auth.spotify import use_spotify_session


@use_spotify_session
def create_playlist(
    playlist_name: str, spotify_user_username: str, room_guid: str, spotify_session: spotipy.Spotify
) -> None:
    spotify_session.user_playlist_create(
        spotify_user_username, playlist_name, public=True, collaborative=False, description=""
    )


@use_spotify_session
def get_playlist(playlist_name: str, room_guid: str, spotify_session: spotipy.Spotify) -> Optional[SpotifyPlaylist]:
    playlists = spotify_session.current_user_playlists()
    playlist_list = [p for p in playlists["items"] if p["name"] == playlist_name]
    playlist = from_dict(data_class=SpotifyPlaylist, data=playlist_list[0]) if playlist_list else None
    return playlist


@use_spotify_session
def add_to_spotify_playlist(
    playlist_id: str, items: List[str], room_guid: str, spotify_session: spotipy.Spotify
) -> None:
    spotify_session.playlist_add_items(playlist_id=playlist_id, items=items)


def add_to_playlist(room_guid: str, song_uri: str) -> None:
    room_info = read_room_info(room_guid)
    playlist = get_playlist(f"ANTWON-{room_info.room_code}", room_guid=room_guid)
    if not playlist:
        create_playlist(f"ANTWON-{room_info.room_code}", room_info.spotify_user_username, room_guid=room_guid)
    add_to_spotify_playlist(playlist.id, [song_uri], room_guid=room_guid)
