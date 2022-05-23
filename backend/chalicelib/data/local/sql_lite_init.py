from sqlalchemy import create_engine

from chalicelib.models.tables.room import Room, User  # noqa: F401
from chalicelib.models.tables.song import RoomSong, Song  # noqa: F401
from chalicelib.models.tables.room_song_like import RoomSongLike  # noqa: F401
from chalicelib.models.tables.spotify_user import SpotifyUser  # noqa: F401
from chalicelib.models.tables.base import Base


def create_db() -> None:
    engine = create_engine("sqlite:///chalicelib/data/local/local.db", echo=True)
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_db()
