from typing import Optional

from chalicelib.data.queries.read_scalar_queries import read_room_code_from_username


def get_room_code_from_username(username: str) -> Optional[str]:
    return read_room_code_from_username(username=username)
