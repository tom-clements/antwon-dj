from unittest.mock import patch, Mock

import pytest

from chalicelib.services.exceptions import RoomSongNotFoundServiceError, LikeAlreadyExistsServiceError
from chalicelib.services.room.add_like import add_like_to_song


# TODO remove boilerplate
@pytest.mark.parametrize(
    "room_song_id, is_like_exists",
    [(None, None), (1, False), (1, True)],
    ids=["room song not found error", "like exists error", "like is added"],
)
@patch("chalicelib.services.room.add_like.read_room_song_id_from_room_song_guid")
@patch("chalicelib.services.room.add_like.read_user_id_from_username")
@patch("chalicelib.services.room.add_like.is_like_exists")
@patch("chalicelib.services.room.add_like.create_like")
def test_add_like_to_song(
    mock_create_like: Mock,
    mock_is_like_exists: Mock,
    mock_read_user_id_from_username: Mock,
    mock_read_room_song_id_from_room_song_guid: Mock,
    room_song_id: str,
    is_like_exists: bool,
) -> None:
    room_song_guid = "room_song_guid"
    username = "username"
    user_id = 1
    mock_read_room_song_id_from_room_song_guid.return_value = room_song_id
    mock_read_user_id_from_username.return_value = user_id
    mock_is_like_exists.return_value = is_like_exists

    if not room_song_id:
        with pytest.raises(RoomSongNotFoundServiceError) as room_song_error:
            add_like_to_song(room_song_guid, username)
        assert room_song_guid in str(room_song_error)

    elif is_like_exists:
        with pytest.raises(LikeAlreadyExistsServiceError) as like_exists_error:
            add_like_to_song(room_song_guid, username)
        assert room_song_guid in str(like_exists_error)

    else:
        add_like_to_song(room_song_guid, username)
        mock_create_like.assert_called_once_with(room_song_id, user_id)
        mock_read_user_id_from_username.assert_called_once_with(username)
        mock_is_like_exists.assert_called_once_with(room_song_id, user_id)
        mock_read_room_song_id_from_room_song_guid.assert_called_once_with(room_song_guid)
