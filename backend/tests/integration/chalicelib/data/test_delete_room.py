import pytest
from sqlalchemy.orm.exc import NoResultFound

from chalicelib.data.delete_room import delete_room
from chalicelib.models import Room
from chalicelib.services.auth import db


@db.use_db_session(database="antwontest", rollback=True)
def delete_room_with_test_db(db_session):
    room_guid = "1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa"
    delete_room(db_session=db_session, room_guid=room_guid)
    with pytest.raises(NoResultFound) as excinfo:
        db_session.query(Room).filter(Room.room_guid == room_guid).one()
    assert "No row was found when one was required" == str(excinfo.value)


def test_delete_room():
    delete_room_with_test_db()
