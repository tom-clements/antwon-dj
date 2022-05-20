import decimal
import datetime
from typing import Dict, Type

import sqlalchemy


PY2SQL_MAP: Dict[Type, Type] = {
    int: sqlalchemy.BigInteger,
    str: sqlalchemy.Unicode,
    float: sqlalchemy.Float,
    decimal.Decimal: sqlalchemy.Numeric,
    datetime.datetime: sqlalchemy.DateTime,
    bytes: sqlalchemy.LargeBinary,
    bool: sqlalchemy.Boolean,
    datetime.date: sqlalchemy.Date,
    datetime.time: sqlalchemy.Time,
    datetime.timedelta: sqlalchemy.Interval,
    list: sqlalchemy.ARRAY,
    dict: sqlalchemy.JSON,
}
