import uuid
from datetime import datetime as dt
from typing import Any, Dict, List

from sqlalchemy import cast, String
from sqlalchemy.orm import session

from chalicelib.antwondb import db
from chalicelib.antwondb.schema import Song, RoomSong, Room


@db.use_db_session
def get_room_guid_from_room_code(db_session: session, room_code: str) -> str:
    return db_session.query(Room.room_guid).filter(Room.room_code == room_code).scalar()


@db.use_db_session
def get_room_queue_from_room_guid(db_session: session, room_guid: str) -> List[Dict[str, Any]]:
    room_queue = (
        db_session.query(
            Song.song_guid,
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
    return [dict(r) for r in room_queue]


@db.use_db_session
def add_song_to_room_queue(db_session, song, room_guid):
    # TODO check is song exists first
    room_id = db_session.query(Room.room_id).filter(Room.room_guid == room_guid).scalar()
    new_song = Song(song_guid=str(uuid.uuid4()), insert_time=dt.now(), last_accessed=dt.now(), **song)
    db_session.add(new_song)
    db_session.flush()
    db_session.add(
        RoomSong(
            room_id=room_id,
            song_id=new_song.song_id,
            is_inactive=False,
            insert_time=dt.now(),
            is_played=False,
            is_removed=False,
            is_added_to_playlist=False,
        )
    )
    db_session.commit()
