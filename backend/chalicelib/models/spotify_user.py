from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

from chalicelib.models import User

Base = declarative_base()


class SpotifyUser(Base):
    __tablename__ = "SpotifyUsers"

    spotify_user_id = Column(Integer, primary_key=True)
    spotify_user_guid = Column(String)
    user_id = Column(Integer, ForeignKey(User.user_id))
    spotify_user_username = Column(String)
    spotify_user_name = Column(String)
    spotify_profile_image_url = Column(String)
    spotify_access_token = Column(String)
    spotify_refresh_token = Column(String)
    insert_time = Column(DateTime)

    def __repr__(self):
        return (
            f"<SpotifyUser(spotify_user_id='{self.spotify_user_id}', spotify_user_guid='{self.spotify_user_guid}',"
            f"user_id='{self.user_id}', spotify_user_username='{self.spotify_user_username}',"
            f"spotify_user_name='{self.spotify_user_name}',"
            f"spotify_profile_image_url='{self.spotify_profile_image_url}',"
            f"spotify_profile_image_url='{self.spotify_profile_image_url}',"
            f"spotify_refresh_token='{self.spotify_refresh_token},"
            f"insert_time='{self.insert_time})>"
        )
