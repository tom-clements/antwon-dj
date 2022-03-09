from chalicelib.data.create_room import create_room
from chalicelib.models import Room
from chalicelib.services.auth.db import use_db_session


@use_db_session(database="antwontest", rollback=True)
def create_room_with_test_db(db_session):
    room_code = "ADDTST"
    create_room(db_session=db_session, room_code=room_code, owner_user_id=1)
    # will throw  NoResultFound if not there
    db_session.query(Room).filter(Room.room_code == room_code).one()


def test_create_room():
    create_room_with_test_db()
