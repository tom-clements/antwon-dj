from typing import Callable, Dict, Any, List

from decorator import decorator

from chalicelib.data.is_exists import is_room_exists
from chalicelib.data.read_one_queries import get_room_owner
from chalicelib.services.exceptions import RoomNotFoundServiceError, ForbiddenServiceError


@decorator
def verify_room_exists(func: Callable, *args: List[str], **kwargs: Dict[str, Any]) -> Any:
    f = func.__wrapped__ if hasattr(func, "__wrapped__") else func  # type: ignore
    dict_args = {name: arg for name, arg in zip(f.__code__.co_varnames, args)}
    room_guid: str = dict_args["room_guid"]  # type: ignore
    if is_room_exists(room_guid):
        return func(*args, **kwargs)
    else:
        raise RoomNotFoundServiceError(room_guid)


@decorator
def verify_room_owner(func: Callable, *args: List[str], **kwargs: Dict[str, Any]) -> Any:
    f = func.__wrapped__ if hasattr(func, "__wrapped__") else func  # type: ignore
    dict_args = {name: arg for name, arg in zip(f.__code__.co_varnames, args)}
    room_owner = get_room_owner(dict_args["room_guid"])
    if room_owner != dict_args["username"]:
        raise ForbiddenServiceError()
    else:
        return func(*args, **kwargs)
