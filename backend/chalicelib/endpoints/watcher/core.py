import asyncio
import time
import uuid
from datetime import datetime as dt

import aiohttp
import requests
from typing import List, Dict, Tuple, Any
from collections import namedtuple

import spotipy
from sqlalchemy.engine import Row
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import RoomSong, Song, Room, User
from chalicelib.endpoints.spotify.core import format_songs
from chalicelib.utils import spotify
from chalicelib.utils.chalice import get_base_url


def add_song_to_spotify_playlist(song_uri: str, room_guid: str) -> None:
    print(f"adding song: {song_uri} to room: {room_guid}")
    api = get_base_url()
    spotify_api = f"{api}/spotifyAddToPlaylist"
    requests.post(
        url=spotify_api,
        json={"song_uri": song_uri, "room_guid": room_guid},
    )


def get_current_song_playing(room_guid: str) -> Dict[str, str]:
    api = get_base_url()
    current_playing_api = f"{api}/spotifyCurrentlyPlaying?room_guid={room_guid}"
    res = requests.get(current_playing_api).json()
    current_playing = res["song"]
    return current_playing


@db.use_db_session(commit=True)
def check_next_song(next_song: namedtuple, room_guid: str, db_session: session) -> Tuple[bool, bool]:
    # add next song to playlist if it hasn't been added already
    added_to_playlist = removed_from_queue = False
    if not next_song["is_added_to_playlist"]:
        print(f"adding song to playlist: {next_song}")
        # TODO: Error handle adding to playlist
        add_song_to_spotify_playlist(next_song["song_uri"], room_guid)
        db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song["room_song_id"]).update(
            {RoomSong.is_added_to_playlist: True}, synchronize_session=False
        )
        db_session.commit()
        added_to_playlist = True
    current_playing = get_current_song_playing(room_guid)
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song["song_uri"]:
        print("updating next song to is_played")
        db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song["room_song_id"]).update(
            {RoomSong.is_played: True}, synchronize_session=False
        )
        removed_from_queue = True
    return added_to_playlist, removed_from_queue


@db.use_db_session()
def get_song_next_to_play(room_guid: str, db_session: session) -> Dict[str, Any]:
    next_song = (
        db_session.query(
            RoomSong.room_song_id,
            Song.song_uri,
            RoomSong.is_added_to_playlist,
            Song.song_name,
            Song.song_artist,
            RoomSong.is_played,
        )
        .join(Song)
        .join(Room)
        .filter(RoomSong.is_played == False, Room.room_guid == room_guid)
        .order_by(RoomSong.insert_time)
        .first()
    )
    return dict(next_song) if next_song else None


@spotify.use_spotify_session
def get_spotify_recommended_song(preivous_track_uris: List[str], spotify_session: spotipy.Spotify, room_guid: str):
    songs_result = spotify_session.recommendations(seed_tracks=preivous_track_uris, country="GB", limit=1)
    return format_songs(songs_result["tracks"])[0]


@db.use_db_session()
def get_last_five_tracked_played(room_guid: str, db_session: session) -> List[str]:
    result = (
        db_session.query(Song.song_uri)
        .join(RoomSong)
        .join(Room)
        .filter(Room.room_guid == room_guid)
        .order_by(RoomSong.insert_time.desc())
        .limit(5)
        .all()
    )
    return [r.song_uri for r in result]


# TODO: similar to function in room endpoints
@db.use_db_session(commit=True)
def add_recommended_song_to_db(room_guid: str, song: Dict[str, str], db_session: session) -> Dict[str, Any]:
    room_id = db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
    song.update(dict(song_guid=str(uuid.uuid4()), insert_time=dt.now(), last_accessed=dt.now()))
    new_song = Song(**song)
    db_session.add(new_song)
    db_session.flush()
    new_room_song = RoomSong(
        room_song_guid=str(uuid.uuid4()),
        room_id=room_id,
        song_id=new_song.song_id,
        is_inactive=False,
        insert_time=dt.now(),
        is_played=False,
        is_removed=False,
        is_added_to_playlist=False,
    )
    db_session.add(new_room_song)


def get_recommended_song(room_guid: str) -> Dict[str, Any]:
    previous_track_uris = get_last_five_tracked_played(room_guid)
    song = get_spotify_recommended_song(previous_track_uris, room_guid=room_guid)
    add_recommended_song_to_db(room_guid, song)
    return get_song_next_to_play(room_guid)


def process_next_song(next_song: Row, room_guid: str) -> Tuple[Dict[str, str], bool, bool]:
    added_to_playlist, removed_from_queue = check_next_song(next_song, room_guid)
    if removed_from_queue:
        next_song, added_to_playlist, removed_from_queue = song_watch(room_guid)

    return dict(next_song), added_to_playlist, removed_from_queue


def song_watch(room_guid: str) -> Tuple[Any, bool, bool]:
    next_song = get_song_next_to_play(room_guid)
    next_song = next_song if next_song else get_recommended_song(room_guid)
    return process_next_song(next_song, room_guid)


async def fetch(session: aiohttp.ClientSession, url: str):
    async with session.get(url) as response:
        return await response.text()


async def poll_rooms(urls: List[str]):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        await asyncio.gather(*tasks)


@db.use_db_session()
def poll_five_seconds(db_session: session):
    for i in range(10):
        active_rooms = (
            db_session.query(
                Room.room_guid,
            )
            .filter(Room.is_inactive == False)
            .all()
        )
        room_guids = [room.room_guid for room in active_rooms]
        print(f"Active rooms: {room_guids}")
        api = get_base_url()
        urls = [f"{api}/pollRoom?room_guid={room_guid}" for room_guid in room_guids]
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(poll_rooms(urls))
        time.sleep(5)
