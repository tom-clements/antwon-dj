from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class SpotifyUser(Base):
    __tablename__ = "SpotifyUsers"

    spotify_user_id = Column(Integer, primary_key=True)
    spotify_user_guid = Column(String)
    user_id = Column(Integer, ForeignKey("Users.user_id"))
    spotify_user_username = Column(String)
    spotify_user_name = Column(String)
    spotify_profile_image_url = Column(String)
    spotify_access_token = Column(String)
    spotify_refresh_token = Column(String)

    def __repr__(self):
        return f"<SpotifyUser(spotify_user_id='{self.spotify_user_id}', spotify_user_guid='{self.spotify_user_guid}', \
        user_id='{self.user_id}', spotify_user_username='{self.spotify_user_username}', spotify_user_name='{self.spotify_user_name}', spotify_profile_image_url='{self.spotify_profile_image_url}', spotify_profile_image_url='{self.spotify_profile_image_url}', spotify_refresh_token='{self.spotify_refresh_token})>"


class User(Base):
    __tablename__ = "Users"

    user_id = Column(Integer, primary_key=True)
    user_guid = Column(String)
    cognito_access_token = Column(String)
    cognito_refresh_token = Column(String)

    def __repr__(self):
        return f"<User(user_id='{self.user_id}', user_guid='{self.user_guid}', \
        cognito_access_token='{self.cognito_access_token}', cognito_refresh_token='{self.cognito_refresh_token}')>"


class Song(Base):
    __tablename__ = "Songs"

    song_id = Column(Integer, primary_key=True)
    song_guid = Column(String)
    song_uri = Column(String)
    song_name = Column(String)
    song_artist = Column(String)
    song_album_url = Column(String)
    insert_time = Column(DateTime)
    last_accessed = Column(DateTime)

    def __repr__(self):
        return f"<Song(song_id='{self.song_id}', song_guid='{self.song_guid}', song_uri='{self.song_uri}', \
        song_name='{self.song_name}', song_artist='{self.song_artist}', song_album_url='{self.song_album_url}', \
        insert_time='{self.insert_time}', last_accessed='{self.last_accessed}')>"


class Room(Base):
    __tablename__ = "Rooms"

    room_id = Column(Integer, primary_key=True)
    room_guid = Column(String)
    room_code = Column(String)
    is_inactive = Column(Boolean)
    owner_user_id = Column(Integer, ForeignKey("Users.user_id"))

    def __repr__(self):
        return f"<Room(room_id='{self.room_id}', room_guid='{self.room_guid}',room_code='{self.room_code}', \
        is_inactive='{self.is_inactive}', owner_user_id='{self.owner_user_id}')>"


class RoomSong(Base):
    __tablename__ = "RoomSongs"

    room_songs_id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("Rooms.room_id"))
    song_id = Column(Integer, ForeignKey("Songs.song_id"))
    is_inactive = Column(Boolean)
    insert_time = Column(DateTime)
    is_played = Column(Boolean)
    is_removed = Column(Boolean)
    is_added_to_playlist = Column(Boolean)

    def __repr__(self):
        return f"<RoomSong(room_songs_id='{self.room_songs_id}', room_id='{self.room_id}', song_id='{self.song_id}', \
        is_inactive='{self.is_inactive}', insert_time='{self.insert_time}', is_played='{self.is_played}', \
        is_removed='{self.is_removed}', is_added_to_playlist='{self.is_added_to_playlist}')>"
