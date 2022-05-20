from dataclasses import asdict
from typing import Dict, Any

from chalicelib.data.read_room_info import read_room_info
from chalicelib.services.utils.verify_room import verify_room_exists, verify_room_owner


@verify_room_exists
@verify_room_owner
def owner_get_room(room_guid: str, username: str) -> Dict[str, Any]:
    return asdict(read_room_info(room_guid))
