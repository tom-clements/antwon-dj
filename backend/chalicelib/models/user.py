from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "Users"

    user_id = Column(Integer, primary_key=True)
    user_username = Column(String)
    create_time = Column(DateTime)

    def __repr__(self):
        return f"<User(user_id='{self.user_id}', user_username='{self.user_username}', \
        cognito_user_name='{self.cognito_user_name}', create_time='{self.create_time},"
