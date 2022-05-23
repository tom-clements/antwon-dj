class DbError(Exception):
    pass


class DbNotFoundError(DbError):
    pass


class NotFoundDbError(DbError):
    pass


class SongNotFoundDbError(NotFoundDbError):
    """Exception raised for errors when song not found in DB

    Attributes:
        song_uri -- uri of song to be found
        message -- explanation of the error
    """

    def __init__(self, song_uri: str, message: str = "Song Not Found") -> None:
        self.song_uri = song_uri
        self.message = message + f": {song_uri}"
        super().__init__(self.message)


class UserNotFoundDbError(NotFoundDbError):
    """Exception raised for errors when song not found in DB

    Attributes:
        song_uri -- uri of song to be found
        message -- explanation of the error
    """

    def __init__(self, username: str, message: str = "User Not Found") -> None:
        self.song_uri = username
        self.message = message + f": {username}"
        super().__init__(self.message)
