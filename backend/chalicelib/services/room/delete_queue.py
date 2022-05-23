from chalicelib.data.queries.queue.delete_room_songs import delete_room_songs
from chalicelib.services.utils.verify_room import verify_room_owner, verify_room_exists


@verify_room_exists
@verify_room_owner
def delete_queue(room_guid: str, username: str) -> None:
    delete_room_songs(room_guid)
