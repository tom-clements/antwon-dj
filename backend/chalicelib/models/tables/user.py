#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mypy: ignore-errors

from sqlalchemy import Column, Integer, String, DateTime

from chalicelib.models.tables.base import Base


class User(Base):
    __tablename__ = "Users"

    user_id = Column(Integer, primary_key=True)
    user_username = Column(String)
    create_time = Column(DateTime)

    def __repr__(self):
        return f"<User(user_id='{self.user_id}', user_username='{self.user_username}', \
        user_username='{self.user_username}', create_time='{self.create_time},"
