import uuid
from collections import namedtuple
from typing import Dict, List, Any

import spotipy
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import Room, SpotifyUser, User
from chalicelib.utils import spotify


@spotify.use_spotify_session
def search_songs(spotify_session: spotipy.Spotify, song_query: str, room_guid: str) -> Dict[str, List[Dict[str, str]]]:
    result = spotify_session.search(q=song_query, type="track")
    songs = [
        {
            "id": r["uri"],
            "song_artist": ", ".join([n["name"] for n in r["artists"]]),
            "song_name": r["name"],
            "song_album_url": r["album"]["images"][0]["url"],
        }
        for i, r in enumerate(result["tracks"]["items"])
    ]
    return {"songs": songs}


@db.use_db_session
def add_spotify_user(db_session: session, user_guid: str, spotify_user: Dict[str, Any]):
    user_id = db_session.query(User.user_id).filter(User.user_guid == user_guid).scalar()
    db_session.add(
        SpotifyUser(
            spotify_user_guid=str(uuid.uuid4()),
            user_id=user_id,
            spotify_user_username=spotify_user["id"],
            spotify_user_name=spotify_user["display_name"],
            spotify_profile_image_url=spotify_user["images"][0]["url"],
            spotify_access_token=spotify_user["access_token"],
            spotify_refresh_token=spotify_user["refresh_token"],
        )
    )
    db_session.commit()


@spotify.use_spotify_session
def get_currently_playing(spotify_session: spotipy.Spotify, room_guid: str):
    r = spotify_session.currently_playing()
    empty_song = {
        "id": "1",
        "song_uri": "a",
        "song_artist": "Add Songs to Queue",
        "song_name": "No Song Playing",
        "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    }

    # if there is something playing
    if r:
        # if the current playing is a song
        if r["item"]:
            r = r["item"]
            song = {
                "id": r["uri"],
                "song_artist": ", ".join([n["name"] for n in r["artists"]]),
                "song_name": r["name"],
                "song_album_url": r["album"]["images"][0]["url"],
                "song_uri": r["uri"],
            }
            return {"statusCode": 200, "song": song}
        else:
            return {"statusCode": 200, "song": empty_song}
    else:
        return {"statusCode": 200, "song": empty_song}


@db.use_db_session
def get_room_info(db_session: session, room_guid: str) -> namedtuple:
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
        playlist = [p for p in playlists["items"] if p["name"] == playlist_name]

    res = spotify_session.user_playlist_add_tracks(
        user=room_info.spotify_user_username, playlist_id=playlist[0]["id"], tracks=[song_uri], position=None
    )
    return res
