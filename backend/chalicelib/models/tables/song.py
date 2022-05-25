#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mypy: ignore-errors

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint

from chalicelib.models import Room
from chalicelib.models.tables.base import Base


class Song(Base):
    __tablename__ = "Songs"
    __table_args__ = (UniqueConstraint("song_uri"),)

    song_id = Column(Integer, primary_key=True)
    song_guid = Column(String)
    song_uri = Column(String)
    song_name = Column(String)
    song_artist = Column(String)
    song_album_url = Column(String)
    insert_time = Column(DateTime)
    last_accessed = Column(DateTime)

    def __repr__(self):
        return f"<Song(song_id='{self.song_id}', song_guid='{self.song_guid}', song_uri='{self.song_uri}', \
        song_name='{self.song_name}', song_artist='{self.song_artist}', song_album_url='{self.song_album_url}', \
        insert_time='{self.insert_time}', last_accessed='{self.last_accessed}')>"


class RoomSong(Base):
    __tablename__ = "RoomSongs"

    room_song_id = Column(Integer, primary_key=True)
    room_song_guid = Column(String)
    room_id = Column(Integer, ForeignKey(Room.room_id))
    song_id = Column(Integer, ForeignKey(Song.song_id))
    is_inactive = Column(Boolean)
    insert_time = Column(DateTime)
    is_played = Column(Boolean)
    is_removed = Column(Boolean)
    is_added_to_playlist = Column(Boolean)

    def __repr__(self):
        return f"<RoomSong(room_song_id='{self.room_song_id}', room_id='{self.room_id}', song_id='{self.song_id}', \
        is_inactive='{self.is_inactive}', insert_time='{self.insert_time}', is_played='{self.is_played}', \
        is_removed='{self.is_removed}', is_added_to_playlist='{self.is_added_to_playlist}')>"
