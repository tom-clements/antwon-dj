from typing import Optional

from chalicelib.data.queries.read_scalar_queries import read_room_code_from_username, read_spotify_user_from_username


def get_room_code_from_username(username: str) -> Optional[str]:
    return read_room_code_from_username(username=username)


def get_is_spotify_connected(username: str) -> bool:
    spotify_user_id = read_spotify_user_from_username(username=username)
    return bool(spotify_user_id)
