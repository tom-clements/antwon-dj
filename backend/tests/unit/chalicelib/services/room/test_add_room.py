from unittest.mock import patch, Mock

import pytest

from chalicelib.services.exceptions import (
    UserRoomExistsServiceError,
    RoomAlreadyExistsServiceError,
    SpotifyUserNotConnectedServiceError,
)
from chalicelib.services.room.add_room import owner_add_room


# TODO remove boilerplate
@pytest.mark.parametrize(
    "room_guid_of_owner, room_guid_of_code, spotify_user",
    [("room_guid", None, None), (None, "room_guid", None), (None, None, None), (None, None, 1)],
    ids=["Owner already has a room", "Code is already active", "User has not connected Spotify", "Add room success"],
)
@patch("chalicelib.services.room.add_room.read_room_guid_from_username")
@patch("chalicelib.services.room.add_room.read_active_room_guid_from_room_code")
@patch("chalicelib.services.room.add_room.read_spotify_user_from_username")
@patch("chalicelib.services.room.add_room.read_user_id_from_username")
@patch("chalicelib.services.room.add_room.create_room")
def test_owner_add_room(
    mock_create_room: Mock,
    mock_read_user_id_from_username: Mock,
    mock_read_spotify_user_from_username: Mock,
    mock_read_active_room_guid_from_room_code: Mock,
    mock_read_room_guid_from_username: Mock,
    room_guid_of_owner: str,
    room_guid_of_code: str,
    spotify_user: Mock,
) -> None:
    room_code = "room_code"
    username = "username"
    owner_user_id = 1
    mock_read_room_guid_from_username.return_value = room_guid_of_owner
    mock_read_active_room_guid_from_room_code.return_value = room_guid_of_code
    mock_read_spotify_user_from_username.return_value = spotify_user
    mock_read_user_id_from_username.return_value = owner_user_id

    if room_guid_of_owner:
        with pytest.raises(UserRoomExistsServiceError) as user_room_error:
            owner_add_room(room_code, username)
        assert room_code in str(user_room_error)

    elif room_guid_of_code:
        with pytest.raises(RoomAlreadyExistsServiceError) as room_exists_error:
            owner_add_room(room_code, username)
        assert room_code in str(room_exists_error)

    elif not spotify_user:
        with pytest.raises(SpotifyUserNotConnectedServiceError) as spotify_error:
            owner_add_room(room_code, username)
        assert username in str(spotify_error)
    else:
        owner_add_room(room_code, username)
        mock_read_room_guid_from_username.assert_called_once_with(username=username)
        mock_read_active_room_guid_from_room_code.assert_called_once_with(room_code)
        mock_read_spotify_user_from_username.assert_called_once_with(username)
        mock_read_user_id_from_username.assert_called_once_with(username)
        mock_create_room.assert_called_once_with(room_code, owner_user_id)
