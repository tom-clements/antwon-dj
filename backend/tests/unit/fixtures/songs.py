from dataclasses import dataclass, asdict
from typing import Dict, Any

from _pytest.fixtures import SubRequest
from pytest import fixture

from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.models.data_queries.queue_song import QueueSongGuest, QueueSongUser


@dataclass
class GuestSongParams:
    insert_time: str
    like_count: int


@dataclass
class UserSongParams(GuestSongParams):
    is_user_liked: bool


GUEST_SONGS = [
    GuestSongParams(insert_time="2022-02-18 00:00:00", like_count=1),
    GuestSongParams(insert_time="2022-02-14 00:00:00", like_count=0),
    GuestSongParams(insert_time="2022-02-26 00:00:00", like_count=1),
    GuestSongParams(insert_time="2022-02-14 00:00:00", like_count=0),
    GuestSongParams(insert_time="2022-02-14 00:00:00", like_count=2),
    GuestSongParams(insert_time="2022-02-18 00:00:00", like_count=0),
]

USER_SONGS = [
    UserSongParams(**dict(**asdict(guest_song), is_user_liked=is_user_liked))
    for guest_song, is_user_liked in zip(GUEST_SONGS, [True, True, False, False, False, True])
]


def get_queue_song_guest_db(like_count: int, insert_time: str) -> Dict[str, Any]:
    return dict(
        room_song_guid="",
        song_uri="",
        song_name="",
        song_artist="",
        song_album_url="",
        is_inactive=False,
        insert_time=insert_time,
        is_played=False,
        is_removed=False,
        like_count=like_count,
    )


def get_next_song_guest_db() -> Dict[str, Any]:
    return dict(
        room_song_guid="room_song_guid",
        song_uri="",
        is_added_to_playlist=False,
        song_name="",
        song_artist="",
        is_played=False,
    )


def get_queue_song_user_db(like_count: int, insert_time: str, is_user_liked: int) -> Dict[str, Any]:
    queue_song_guest_db = get_queue_song_guest_db(like_count, insert_time)
    queue_song_guest_db["is_user_liked"] = is_user_liked
    return queue_song_guest_db


@dataclass
class QueueSongResult:
    db_result: Dict[str, Any]
    result: QueueSongGuest


@dataclass
class NextSongResult:
    db_result: Dict[str, Any]
    result: NextSong


@fixture()
def next_song1() -> NextSongResult:
    db_result = get_next_song_guest_db()
    result = NextSong(**db_result)
    return NextSongResult(db_result=db_result, result=result)


@fixture
def guest_song_no_params() -> QueueSongResult:
    db_result = get_queue_song_guest_db(insert_time="", like_count=0)
    result = QueueSongGuest(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=GUEST_SONGS[0:2])
def guest_song(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_guest_db(insert_time=request.param.insert_time, like_count=request.param.like_count)
    result = QueueSongGuest(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=GUEST_SONGS[2:4])
def guest_song2(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_guest_db(insert_time=request.param.insert_time, like_count=request.param.like_count)
    result = QueueSongGuest(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=GUEST_SONGS[4:6])
def guest_song3(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_guest_db(insert_time=request.param.insert_time, like_count=request.param.like_count)
    result = QueueSongGuest(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture
def user_song_no_params() -> QueueSongResult:
    db_result = get_queue_song_user_db(insert_time="", like_count=1, is_user_liked=True)
    result = QueueSongUser(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=USER_SONGS[0:2])
def user_song(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_user_db(
        insert_time=request.param.insert_time,
        like_count=request.param.like_count,
        is_user_liked=request.param.is_user_liked,
    )
    result = QueueSongUser(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=USER_SONGS[2:4])
def user_song2(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_user_db(
        insert_time=request.param.insert_time,
        like_count=request.param.like_count,
        is_user_liked=request.param.is_user_liked,
    )
    result = QueueSongUser(**db_result)
    return QueueSongResult(db_result=db_result, result=result)


@fixture(params=USER_SONGS[4:6])
def user_song3(request: SubRequest) -> QueueSongResult:
    db_result = get_queue_song_user_db(
        insert_time=request.param.insert_time,
        like_count=request.param.like_count,
        is_user_liked=request.param.is_user_liked,
    )
    result = QueueSongUser(**db_result)
    return QueueSongResult(db_result=db_result, result=result)
