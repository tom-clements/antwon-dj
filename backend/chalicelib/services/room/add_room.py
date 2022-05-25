from chalicelib.data.queries.create_room import create_room
from chalicelib.data.queries.read_scalar_queries import (
    read_user_id_from_username,
    read_active_room_guid_from_room_code,
    read_room_guid_from_username,
    read_spotify_user_from_username,
)
from chalicelib.services.exceptions import (
    RoomAlreadyExistsServiceError,
    UserRoomExistsServiceError,
    SpotifyUserNotConnectedServiceError,
)


def owner_add_room(room_code: str, username: str) -> None:
    room_guid_of_owner = read_room_guid_from_username(username=username)
    if room_guid_of_owner:
        raise UserRoomExistsServiceError(room_code)

    room_guid = read_active_room_guid_from_room_code(room_code)
    if room_guid:
        raise RoomAlreadyExistsServiceError(room_code)

    spotify_user = read_spotify_user_from_username(username)
    if not spotify_user:
        raise SpotifyUserNotConnectedServiceError(username)

    owner_user_id = read_user_id_from_username(username)
    create_room(room_code, owner_user_id)
