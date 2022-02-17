import uuid
import time
from collections import namedtuple
from typing import Dict, List, Any

import spotipy
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import Room, SpotifyUser, User
from chalicelib.utils import spotify


def format_songs(songs):
    return [
        {
            "id": r["uri"],
            "song_artist": ", ".join([n["name"] for n in r["artists"]]),
            "song_name": r["name"],
            "song_album_url": r["album"]["images"][0]["url"],
        }
        for i, r in enumerate(songs["tracks"]["items"])
    ]


@spotify.use_spotify_session
def search_songs(
    spotify_session: spotipy.Spotify, song_query: str, room_guid: str, spotify_routes
) -> List[Dict[str, str]]:
    spotify_routes.log.info(f"/spotifySearch searching songs")
    st = time.time()
    result = spotify_session.search(q=song_query, type="track")
    spotify_routes.log.info(f"/spotifySearch spotify search result took {int(1000*(time.time()-st))}ms")
    return format_songs(result)


@db.use_db_session(commit=True)
def add_spotify_user(
    user_guid: str, access_token: str, refresh_token: str, spotify_user: Dict[str, Any], db_session: session
):
    user_id = db_session.query(User.user_id).filter(User.user_guid == user_guid).scalar()
    db_session.add(
        SpotifyUser(
            spotify_user_guid=str(uuid.uuid4()),
            user_id=user_id,
            spotify_user_username=spotify_user["id"],
            spotify_user_name=spotify_user["display_name"],
            spotify_profile_image_url=spotify_user["images"][0]["url"],
            spotify_access_token=access_token,
            spotify_refresh_token=refresh_token,
        )
    )


@spotify.use_spotify_session
def get_currently_playing(spotify_session: spotipy.Spotify, room_guid: str):
    current_playing = spotify_session.currently_playing()
    empty_song = {
        "id": "1",
        "song_uri": "a",
        "song_artist": "Add Songs to Queue",
        "song_name": "No Song Playing",
        "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    }

    # if there is something playing and if the current playing is a song
    if current_playing and current_playing["item"]:
        print(current_playing)
        return {
            "id": current_playing["item"]["uri"],
            "song_artist": ", ".join([n["name"] for n in current_playing["item"]["artists"]]),
            "song_name": current_playing["item"]["name"],
            "song_album_url": current_playing["item"]["album"]["images"][0]["url"],
            "song_uri": current_playing["item"]["uri"],
        }
    else:
        return empty_song


@db.use_db_session()
def get_room_info(room_guid: str, db_session: session) -> namedtuple:
    return (
        db_session.query(Room.room_code, SpotifyUser.spotify_user_username)
        .select_from(Room)
        .join(User)
        .join(SpotifyUser)
        .filter(Room.room_guid == room_guid)
        .one()
    )


@spotify.use_spotify_session
def add_to_playlist(spotify_session: spotipy.Spotify, room_guid: str, song_uri: str):
    room_info = get_room_info(room_guid)
    playlists = spotify_session.current_user_playlists()
    room_code = room_info.room_code
    playlist_name = f"ANTWON-{room_code}"
    playlist = [p for p in playlists["items"] if p["name"] == playlist_name]
    if not playlist:
        print(f"creating playlist: {playlist_name}")
        spotify_session.user_playlist_create(
            room_info.spotify_user_username, playlist_name, public=True, collaborative=False, description=""
        )
        playlists = spotify_session.current_user_playlists()
        playlist = [p for p in playlists["items"] if p["name"] == playlist_name]
        if not playlist:
            raise ValueError("Playlist created but not found")

    res = spotify_session.user_playlist_add_tracks(
        user=room_info.spotify_user_username, playlist_id=playlist[0]["id"], tracks=[song_uri], position=None
    )
    return res
