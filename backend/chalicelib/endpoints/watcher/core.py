import json
import asyncio
import time
import aiohttp
import requests
from typing import List, Dict, Tuple, Any
from collections import namedtuple

from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import RoomSong, Song, Room
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
    if not next_song.is_added_to_playlist:
        print(f"adding song to playlist: {next_song}")
        # TODO: Error handle adding to playlist
        add_song_to_spotify_playlist(next_song.song_uri, room_guid)
        db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song.room_song_id).update(
            {RoomSong.is_added_to_playlist: True}, synchronize_session=False
        )
        db_session.commit()
        added_to_playlist = True
    current_playing = get_current_song_playing(room_guid)
    # if the next song starts playing, set it as played
    if current_playing["song_uri"] == next_song.song_uri:
        print("updating next song to is_played")
        db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song.room_song_id).update(
            {RoomSong.is_played: True}, synchronize_session=False
        )
        removed_from_queue = True
    return added_to_playlist, removed_from_queue


@db.use_db_session()
def song_watch(room_guid: str, db_session: session) -> Tuple[Any, bool, bool]:
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
        .filter(RoomSong.is_played == False, RoomSong.room_id == 1)
        .order_by(RoomSong.insert_time)
        .first()
    )
    print(f"next song: {next_song}")
    # if there is a next song
    if next_song:
        added_to_playlist, removed_from_queue = check_next_song(next_song, room_guid)
        if removed_from_queue:
            next_song, added_to_playlist, removed_from_queue = song_watch(room_guid)

        return dict(next_song), added_to_playlist, removed_from_queue

    else:
        return None, False, False


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
