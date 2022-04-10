from typing import Union

from chalice import Response

from chalicelib.data.delete_like import delete_like
from chalicelib.data.is_exists import is_like_exists
from chalicelib.data.read_scalar_queries import get_room_song_id_from_room_song_guid, get_user_id_from_username


def delete_like_from_song(room_song_guid: str, username: str) -> Union[Response, None]:
    room_song_id = get_room_song_id_from_room_song_guid(room_song_guid)
    user_id = get_user_id_from_username(username)
    if is_like_exists(room_song_id, user_id):
        delete_like(room_song_id, user_id)
    else:
        return Response(body="Like doesn't exists", status_code=409)
