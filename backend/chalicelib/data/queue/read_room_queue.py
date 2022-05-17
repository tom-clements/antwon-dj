from dataclasses import fields
from typing import List, Final

from sqlalchemy import String, cast, false, func, column, Boolean, Integer
from sqlalchemy.orm import Session, Query
from sqlalchemy.sql import Alias

from chalicelib.models import RoomSong, Song, Room, RoomSongLike
from chalicelib.models.data_queries.queue_song import QueueSongGuest, QueueSongUser, QueueSong
from chalicelib.services.auth.db import use_db_session


QUEUE_COLS: Final[List[column]] = [column(col.name) for col in fields(QueueSong)]
QUEUE_COLS_GUEST: Final[List[column]] = [column(col.name) for col in fields(QueueSongGuest)]
QUEUE_COLS_USER: Final[List[column]] = [column(col.name) for col in fields(QueueSongUser)]


@use_db_session()
def read_room_queue_query(room_guid: str, db_session: Session) -> Query:
    return (
        db_session.query(
            RoomSong.room_song_guid,
            RoomSong.room_song_id,
            Song.song_uri,
            Song.song_name,
            Song.song_artist,
            Song.song_album_url,
            RoomSong.is_inactive,
            cast(RoomSong.insert_time, String).label("insert_time"),
            RoomSong.is_played,
            RoomSong.is_removed,
            RoomSong.is_added_to_playlist,
        )
        .join(Song)
        .join(Room)
        .filter(RoomSong.is_played == false(), Room.room_guid == room_guid)
        .subquery()
    )


@use_db_session()
def read_song_likes_query(room_guid: str, db_session: Session) -> Alias:
    return (
        db_session.query(
            RoomSongLike.room_song_id, cast(func.sum(RoomSongLike.like_value), Integer).label("like_count")
        )
        .group_by(RoomSongLike.room_song_id)
        .subquery()
    )


@use_db_session()
def read_is_user_liked_query(user_id: int, room_guid: str, db_session: Session) -> Alias:
    return (
        db_session.query(RoomSongLike.room_song_id, cast(RoomSongLike.user_id, Boolean).label("is_user_liked"))
        .filter(RoomSongLike.user_id == user_id)
        .subquery()
    )


@use_db_session()
def read_queue_column_query(room_guid: str, db_session: Session, cols: List[column] = None) -> Query:
    if cols is None:
        cols = []
    room_queue_query = read_room_queue_query(room_guid=room_guid)
    likes_query = read_song_likes_query(room_guid=room_guid)
    return (
        db_session.query(*cols)
        .select_from(room_queue_query)
        .join(likes_query, isouter=True)
        .order_by(column("like_count").desc(), column("insert_time"))
    )


def read_room_queue_guest(room_guid: str) -> List[QueueSongGuest]:
    room_queue = read_queue_column_query(room_guid=room_guid, cols=QUEUE_COLS_GUEST).all()
    return [QueueSongGuest(**r) for r in room_queue]


def read_room_queue_user(user_id: int, room_guid: str) -> List[QueueSongGuest]:
    is_user_liked_query = read_is_user_liked_query(user_id, room_guid=room_guid)
    room_queue = (
        read_queue_column_query(room_guid=room_guid, cols=QUEUE_COLS_USER).join(is_user_liked_query, isouter=True).all()
    )
    return [QueueSongUser(**r) for r in room_queue]


@use_db_session()
def read_last_five_played_tracked(room_guid: str, db_session: Session) -> List[str]:
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
