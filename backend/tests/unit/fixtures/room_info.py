from pytest import fixture

from chalicelib.models.data_queries.room_info import RoomInfo


@fixture()
def room_info() -> RoomInfo:
    return RoomInfo(
        room_code="room_code", room_guid="room_guid", user_username="test_user", is_inactive=False, create_time=""
    )
