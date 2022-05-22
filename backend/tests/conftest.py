import pytest  # noqa: F401

from tests.unit.fixtures.queue import guest_queue, user_queue  # noqa: F401
from tests.unit.fixtures.songs import (  # noqa: F401
    guest_song,
    guest_song2,
    guest_song3,
    user_song,
    user_song2,
    user_song3,
    next_song1,
)
from tests.unit.fixtures.user_info import cognito_user_info, user_info  # noqa: F401
from tests.unit.fixtures.cognito import code_token  # noqa: F401