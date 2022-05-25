class ServiceError(Exception):
    pass


class NotFoundServiceError(ServiceError):
    pass


class BadGatewayServiceError(ServiceError):
    pass


class RoomNotFoundServiceError(NotFoundServiceError):
    """Exception raised for errors in incorrect room guids

    Attributes:
        room_guid -- room guid that caused the error
        message -- explanation of the error
    """

    def __init__(self, room_guid: str, message: str = "Room Not Found") -> None:
        self.room_guid = room_guid
        self.message = message + f": {room_guid}"
        super().__init__(self.message)


class LikeNotFoundServiceError(NotFoundServiceError):
    """Exception raised for non existant likes

    Attributes:
        room_guid -- room guid that caused the error
        message -- explanation of the error
    """

    def __init__(self, room_song_guid: str, username: str, message: str = "Like Not Found") -> None:
        self.room_song_guid = room_song_guid
        self.message = message + f" User: {username}, Room Song: {room_song_guid}"
        super().__init__(self.message)


class RoomSongNotFoundServiceError(NotFoundServiceError):
    """Exception raised for non existant likes

    Attributes:
        room_guid -- room guid that caused the error
        message -- explanation of the error
    """

    def __init__(self, room_song_guid: str, message: str = "Like Not Found") -> None:
        self.room_song_guid = room_song_guid
        self.message = message + f": {room_song_guid}"
        super().__init__(self.message)


class ForbiddenServiceError(ServiceError):
    """Exception raised for insufficient permissions for requested action

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message: str = "Insufficient permissions to perform this action") -> None:
        self.message = message
        super().__init__(self.message)


class ConflictServiceError(ServiceError):
    pass


class LikeAlreadyExistsServiceError(ConflictServiceError):
    """Exception raised for attempts to add a like to a song that is already liked

    Attributes:
        room_song_guid -- room song guid that exists
        message -- explanation of the error
    """

    def __init__(self, room_song_guid: str, message: str = "Like already exists") -> None:
        self.room_song_guid = room_song_guid
        self.message = message + f": {room_song_guid}"
        super().__init__(self.message)


class SpotifyUserExistsServiceError(ConflictServiceError):
    """Exception raised for attempts to link an account to spotify that already is linked

    Attributes:
        username -- username of user trying to link
        message -- explanation of the error
    """

    def __init__(self, username: str, message: str = "User is already linked to spotify") -> None:
        self.username = username
        self.message = message + f": {username}"
        super().__init__(self.message)


class RoomAlreadyExistsServiceError(ConflictServiceError):
    """Exception raised for attempts to add a room that already exists

    Attributes:
        room_song_guid -- room song guid that exists
        message -- explanation of the error
    """

    def __init__(self, room_code: str, message: str = "Room already exists") -> None:
        self.room_code = room_code
        self.message = message + f": {room_code}"
        super().__init__(self.message)


class UserRoomExistsServiceError(ConflictServiceError):
    """Exception raised for attempts to add a room that already exists

    Attributes:
        room_song_guid -- room song guid that exists
        message -- explanation of the error
    """

    def __init__(self, room_guid: str, message: str = "User room already exists") -> None:
        self.room_code = room_guid
        self.message = message + f": {room_guid}"
        super().__init__(self.message)


class UserLogoutServiceError(BadGatewayServiceError):
    """Exception raised for errors logging out of cognito

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message: str = "Logout unsuccessful") -> None:
        self.message = message
        super().__init__(self.message)
