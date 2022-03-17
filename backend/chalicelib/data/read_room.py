from sqlalchemy import false
from sqlalchemy.orm import session
from sqlalchemy.util import namedtuple

from chalicelib.models import Room
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_active_rooms(db_session: session) -> namedtuple:
    return (
        db_session.query(
            Room.room_guid,
        )
        .filter(Room.is_inactive == false())
        .all()
    )
