#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mypy: ignore-errors

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

from chalicelib.models import RoomSong, User

Base = declarative_base()


class RoomSongLike(Base):
    __tablename__ = "RoomSongLikes"

    room_song_like_id = Column(Integer, primary_key=True)
    room_song_like_guid = Column(String)
    room_song_id = Column(Integer, ForeignKey(RoomSong.room_song_id))
    user_id = Column(Integer, ForeignKey(User.user_id))
    like_value = Column(Integer)
    create_time = Column(DateTime)

    def __repr__(self):
        return (
            f"<RoomSongLikes(room_song_like_id='{self.room_song_like_id}',"
            f"room_song_like_guid='{self.room_song_like_guid}',"
            f"room_song_id='{self.room_song_id}',"
            f"user_id='{self.user_id}',"
            f"like_value='{self.like_value}',"
            f"create_time='{self.create_time}')>"
        )
