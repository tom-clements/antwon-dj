from dataclasses import dataclass, fields

from typeguard import check_type


@dataclass
class BaseDto:
    def __post_init__(self) -> None:
        for field in fields(self):
            check_type(field.name, self.__dict__[field.name], expected_type=field.type)
