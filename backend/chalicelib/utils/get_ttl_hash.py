import time


def get_ttl_hash(seconds: int = 5) -> int:
    """Return the same value withing `seconds` time period"""
    return round(time.time() / seconds)
