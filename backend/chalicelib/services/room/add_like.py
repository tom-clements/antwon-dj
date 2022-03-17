from typing import Union

from chalice import Response

from chalicelib.data.create_like import create_like
from chalicelib.data.is_exists import is_like_exists
from chalicelib.data.read_scalar_queries import get_room_song_id_from_room_song_guid, get_user_id_from_username


def add_like_to_song(room_song_guid: str, username: str) -> Union[Response, None]:
    room_song_id = get_room_song_id_from_room_song_guid(room_song_guid)
    user_id = get_user_id_from_username(username)
    if is_like_exists(room_song_id, user_id):
        return Response(body=f"Like already exists", status_code=409)
    else:
        create_like(room_song_id, user_id)
