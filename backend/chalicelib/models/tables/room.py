#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mypy: ignore-errors

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

from chalicelib.models.tables.user import User

Base = declarative_base()


class Room(Base):
    __tablename__ = "Rooms"

    room_id = Column(Integer, primary_key=True)
    room_guid = Column(String)
    room_code = Column(String)
    is_inactive = Column(Boolean)
    owner_user_id = Column(Integer, ForeignKey(User.user_id))
    create_time = Column(DateTime)

    def __repr__(self):
        return f"<Room(room_id='{self.room_id}', room_guid='{self.room_guid}',room_code='{self.room_code}', \
        is_inactive='{self.is_inactive}', owner_user_id='{self.owner_user_id}, create_time='{self.create_time}')>"
