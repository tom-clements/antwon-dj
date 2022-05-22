from dataclasses import dataclass, field
from typing import List

from pytest import fixture

from tests.unit.fixtures.songs import QueueSongResult


@dataclass
class QueueResult:
    songs: List[QueueSongResult]
    sorted_songs: List[QueueSongResult] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.sorted_songs = sorted(self.songs, key=lambda x: (-x.result.like_count, x.result.insert_time))


@fixture()
def guest_queue_no_params(guest_song_no_params: QueueSongResult) -> QueueResult:
    return QueueResult(songs=[guest_song_no_params, guest_song_no_params, guest_song_no_params])


@fixture()
def guest_queue(guest_song: QueueSongResult, guest_song2: QueueSongResult, guest_song3: QueueSongResult) -> QueueResult:
    return QueueResult(songs=[guest_song, guest_song2, guest_song3])


@fixture()
def user_queue_no_params(user_song_no_params: QueueSongResult) -> QueueResult:
    return QueueResult(songs=[user_song_no_params, user_song_no_params, user_song_no_params])


@fixture()
def user_queue(user_song: QueueSongResult, user_song2: QueueSongResult, user_song3: QueueSongResult) -> QueueResult:
    return QueueResult(songs=[user_song, user_song2, user_song3])
