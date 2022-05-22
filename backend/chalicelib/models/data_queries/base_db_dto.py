from dataclasses import dataclass, Field, fields, _MISSING_TYPE
from typing import List

from sqlalchemy import column, cast, func
from sqlalchemy.sql.elements import Label

from chalicelib.data.utils.type_conversion import PY2SQL_MAP
from chalicelib.models.base_dto import BaseDto


@dataclass
class BaseDbDto(BaseDto):
    @classmethod
    def sqlalchemy_columns(cls) -> List[Label]:
        return [
            (
                cls._get_sql_column(field)
                if isinstance(field.default, _MISSING_TYPE)
                else cls._get_sql_column_with_default(field)
            )
            for field in fields(cls)
        ]

    @staticmethod
    def _get_sql_column(field: Field) -> Label:
        return cast(column(field.name), PY2SQL_MAP[field.type]).label(field.name)

    @staticmethod
    def _get_sql_column_with_default(field: Field) -> Label:
        if type(field.default) not in [float, int, bool, str]:
            raise NotImplementedError(
                f"default value: {field.default} has type: {type(field.default)}."
                f"Which needs to be implementated for SQLAlchemy coalesce mapping"
            )
        col = func.coalesce(column(field.name), field.default)
        return cast(col, PY2SQL_MAP[field.type]).label(field.name)
