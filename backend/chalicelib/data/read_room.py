from typing import List

from sqlalchemy import false
from sqlalchemy.orm import Session

from chalicelib.models import Room
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_active_rooms(db_session: Session) -> List[str]:
    result = (
        db_session.query(
            Room.room_guid,
        )
        .filter(Room.is_inactive == false())
        .all()
    )
    return [r.room_guid for r in result]
