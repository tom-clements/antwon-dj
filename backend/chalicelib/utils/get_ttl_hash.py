import time


def get_ttl_hash(seconds=5):
    """Return the same value withing `seconds` time period"""
    return round(time.time() / seconds)
