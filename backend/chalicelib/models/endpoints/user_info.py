from dataclasses import dataclass
from typing import Optional

from chalicelib.models.cognito.user_info import CognitoUserInfoDto


@dataclass
class UserInfoDto(CognitoUserInfoDto):
    room_code: Optional[str] = None
