#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mypy: ignore-errors

from sqlalchemy import Column, Integer, String, DateTime, UniqueConstraint

from chalicelib.models.tables.base import Base


class User(Base):
    __tablename__ = "Users"
    __table_args__ = (UniqueConstraint("user_username"),)

    user_id = Column(Integer, primary_key=True)
    user_username = Column(String)
    id_token = Column(String)
    create_time = Column(DateTime)

    def __repr__(self):
        return (
            f"<User(user_id='{self.user_id}',"
            f"user_username='{self.user_username}',"
            f"id_token='{self.id_token}'"
            f"create_time='{self.create_time},"
        )
