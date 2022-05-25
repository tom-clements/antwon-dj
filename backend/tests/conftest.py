import pytest  # noqa: F401

from tests.unit.fixtures.queue import guest_queue, user_queue, guest_queue_no_params, user_queue_no_params  # noqa: F401
from tests.unit.fixtures.songs import (  # noqa: F401
    guest_song_no_params,
    guest_song,
    guest_song2,
    guest_song3,
    user_song_no_params,
    user_song,
    user_song2,
    user_song3,
    next_song1,
)
from tests.unit.fixtures.user_info import cognito_user_info, user_info, user_token  # noqa: F401
from tests.unit.fixtures.cognito.tokens import cognito_code_token, cognito_token  # noqa: F401
from tests.unit.fixtures.room_info import room_info  # noqa: F401
