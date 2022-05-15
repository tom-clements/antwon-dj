from chalicelib.data.queue.create_like import create_like
from chalicelib.data.is_exists import is_like_exists
from chalicelib.data.read_scalar_queries import get_room_song_id_from_room_song_guid, get_user_id_from_username
from chalicelib.services.exceptions import LikeAlreadyExistsServiceError, RoomSongNotFoundServiceError


def add_like_to_song(room_song_guid: str, username: str) -> None:
    room_song_id = get_room_song_id_from_room_song_guid(room_song_guid)
    if not room_song_id:
        raise RoomSongNotFoundServiceError(room_song_guid)
    user_id = get_user_id_from_username(username)
    if is_like_exists(room_song_id, user_id):
        raise LikeAlreadyExistsServiceError(room_song_guid)
    else:
        return create_like(room_song_id, user_id)
