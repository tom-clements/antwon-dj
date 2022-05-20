from chalicelib.data.delete_room import db_delete_room
from chalicelib.services.utils.verify_room import verify_room_exists, verify_room_owner


@verify_room_exists
@verify_room_owner
def owner_delete_room(room_guid: str, username: str) -> None:
    db_delete_room(room_guid)
