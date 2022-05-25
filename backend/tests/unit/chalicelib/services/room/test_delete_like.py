from unittest.mock import patch, Mock

import pytest

from chalicelib.services.exceptions import RoomSongNotFoundServiceError, LikeNotFoundServiceError
from chalicelib.services.room.delete_like import delete_like_from_song


# TODO remove boilerplate
@pytest.mark.parametrize(
    "room_song_id, is_like_exists",
    [(None, None), (1, False), (1, True)],
    ids=["room song not found error", "like exists error", "like is added"],
)
@patch("chalicelib.services.room.delete_like.read_room_song_id_from_room_song_guid")
@patch("chalicelib.services.room.delete_like.read_user_id_from_username")
@patch("chalicelib.services.room.delete_like.is_like_exists")
@patch("chalicelib.services.room.delete_like.delete_like")
def test_delete_like_from_song(
    mock_delete_like: Mock,
    mock_is_like_exists: Mock,
    mock_read_user_id_from_username: Mock,
    mock_read_room_song_id_from_room_song_guid: Mock,
    room_song_id,
    is_like_exists,
) -> None:
    room_song_guid = "room_song_guid"
    username = "username"
    user_id = 1
    mock_read_room_song_id_from_room_song_guid.return_value = room_song_id
    mock_read_user_id_from_username.return_value = user_id
    mock_is_like_exists.return_value = is_like_exists
    if not room_song_id:
        with pytest.raises(RoomSongNotFoundServiceError) as room_song_error:
            delete_like_from_song(room_song_guid, username)
        assert room_song_guid in str(room_song_error)
    else:
        if is_like_exists:
            delete_like_from_song(room_song_guid, username)
            mock_delete_like.assert_called_once_with(room_song_id, user_id)
        else:
            with pytest.raises(LikeNotFoundServiceError) as like_exists_error:
                delete_like_from_song(room_song_guid, username)
            assert room_song_guid in str(like_exists_error)

        mock_read_user_id_from_username.assert_called_once_with(username)
        mock_is_like_exists.assert_called_once_with(room_song_id, user_id)

    mock_read_room_song_id_from_room_song_guid.assert_called_once_with(room_song_guid)
