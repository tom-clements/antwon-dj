from chalicelib.data.queries.queue.delete_like import delete_like
from chalicelib.data.queries.is_exists import is_like_exists
from chalicelib.data.queries.read_scalar_queries import get_room_song_id_from_room_song_guid, get_user_id_from_username
from chalicelib.services.exceptions import LikeNotFoundServiceError, RoomSongNotFoundServiceError


def delete_like_from_song(room_song_guid: str, username: str) -> None:
    room_song_id = get_room_song_id_from_room_song_guid(room_song_guid)
    if not room_song_id:
        raise RoomSongNotFoundServiceError(room_song_guid)
    user_id = get_user_id_from_username(username)
    if is_like_exists(room_song_id, user_id):
        delete_like(room_song_id, user_id)
    else:
        raise LikeNotFoundServiceError(room_song_guid, username)
