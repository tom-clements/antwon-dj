from chalicelib.data.read_scalar_queries import get_room_guid_from_room_code
from chalicelib.services.exceptions import NonExistantRoomServiceError


def get_room_guid(room_code: str) -> str:
    room_guid = get_room_guid_from_room_code(room_code)
    if room_guid:
        return room_guid
    else:
        raise NonExistantRoomServiceError(room_code)
