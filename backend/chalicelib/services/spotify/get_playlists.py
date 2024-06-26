from typing import List

import spotipy  # type: ignore
from dacite import from_dict

from chalicelib.data.queries.read_scalar_queries import read_room_guid_from_username
from chalicelib.models.spotify_api.playlist import SpotifyPlaylist
from chalicelib.services.spotify.auth import use_spotify_session


@use_spotify_session
def retrieve_playlists_from_room_guid(room_guid: str, spotify_session: spotipy.Spotify) -> List[SpotifyPlaylist]:
    playlists = spotify_session.current_user_playlists()
    return [from_dict(data_class=SpotifyPlaylist, data=playlist) for playlist in playlists["items"]]


def get_playlists_from_username(username: str) -> List[SpotifyPlaylist]:
    room_guid = read_room_guid_from_username(username)
    return retrieve_playlists_from_room_guid(room_guid=room_guid)
