import uuid
from datetime import datetime as dt
from typing import List

from chalice import ForbiddenError
from sqlalchemy import cast, String
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import Song, RoomSong, Room, RoomSongLike, User


@db.use_db_session()
def get_room_guid_from_room_code(room_code: str, db_session: session) -> str:
    return db_session.query(Room.room_guid).filter(Room.room_code == room_code).scalar()


@db.use_db_session()
def get_room_queue_from_room_guid(room_guid: str, db_session: session) -> List[Room]:
    room_queue = (
        db_session.query(
            RoomSong.room_song_guid,
            Song.song_uri,
            Song.song_name,
            Song.song_artist,
            Song.song_album_url,
            RoomSong.is_inactive,
            cast(RoomSong.insert_time, String).label("insert_time"),
            RoomSong.is_played,
            RoomSong.is_removed,
        )
        .join(Song)
        .join(Room)
        .filter(Room.room_guid == room_guid)
        .all()
    )
    return room_queue


@db.use_db_session(commit=True)
def add_room(room_code, db_session):
    try:
        db_session.query(Room).filter(Room.room_code == room_code).one()
        raise ValueError(f"Room already exists with the code: {room_code}")
    except NoResultFound:
        new_room = Room(room_guid=str(uuid.uuid4()), room_code=room_code, create_time=dt.now())
        db_session.add(new_room)


@db.use_db_session(commit=True)
def delete_room(room_guid, db_session):
    num_deleted_rows = db_session.query(Room).filter(Room.room_guid == room_guid).delete()
    if num_deleted_rows == 0:
        raise ValueError(f"No room exists with the guid {room_guid}")


@db.use_db_session(commit=True)
def check_room_delete_permissions(room_guid: str, username: str, db_session: session):
    owner_username = db_session.query(User.cognito_user_name).join(Room).filter(Room.room_guid == room_guid).one()
    if owner_username != username:
        raise ForbiddenError("Insufficient permissions to perform this action")


@db.use_db_session(commit=True)
def add_like_to_song(room_song_guid: str, db_session: session, token: str, user: User):
    room_song_id = db_session.query(RoomSong.room_song_id).filter(RoomSong.room_song_guid == room_song_guid).scalar()
    db_session.add(
        RoomSongLike(
            room_song_like_guid=str(uuid.uuid4()), room_song_id=room_song_id, user_id=user.user_id, like_value=1
        )
    )


@db.use_db_session(commit=True)
def remove_like_from_song(room_song_guid: str, db_session: session, token: str, user: User):
    num_deleted_rows = (
        db_session.query(RoomSongLike)
        .filter(RoomSongLike.room_song_guid == room_song_guid, RoomSongLike.user_cognito_guid == user.user_cognito_guid)
        .delete()
    )
    if num_deleted_rows == 0:
        raise ValueError(f"User {user.user_cognito_guid} has not liked room song {room_song_guid}")


@db.use_db_session(commit=True)
def add_song_to_room_queue(song, room_guid, db_session):
    # TODO check is song exists first
    room_id = db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
    new_song = Song(song_guid=str(uuid.uuid4()), insert_time=dt.now(), last_accessed=dt.now(), **song)
    db_session.add(new_song)
    db_session.flush()
    db_session.add(
        RoomSong(
            room_song_guid=str(uuid.uuid4()),
            room_id=room_id,
            song_id=new_song.song_id,
            is_inactive=False,
            insert_time=dt.now(),
            is_played=False,
            is_removed=False,
            is_added_to_playlist=False,
        )
    )


@db.use_db_session(commit=True)
def purge_room_songs(room_guid: str, db_session: session):
    room_id = db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
    db_session.query(RoomSong).filter(RoomSong.room_id == room_id).delete()
