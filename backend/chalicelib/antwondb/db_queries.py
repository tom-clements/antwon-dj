import boto3
import uuid
from typing import List, Union, Dict

rds_client = boto3.client("rds-data")

database_name = "auroradb"
db_cluster_arn = "arn:aws:rds:eu-west-2:303078101535:cluster:auroradb"
db_credential_secrets_store_arn = "arn:aws:secretsmanager:eu-west-2:303078101535:secret:rds-db-credentials/cluster-HOPH722GCFSMMPROYVUROAKCXM/admin-elwhMg"


def execute_sql(sql: str, params: List = ()) -> List:
    response = rds_client.execute_statement(
        secretArn=db_credential_secrets_store_arn,
        database=database_name,
        resourceArn=db_cluster_arn,
        sql=sql,
        parameters=params,
    )
    return response


def get_user_int_id(user_guid: str) -> int:
    uuid.UUID(user_guid)  # check uuid is valuid
    sql = f"""SELECT user_id from auroradb.Users where user_guid = \"{user_guid}\""""
    user_id = execute_sql(sql)["records"][0][0]["longValue"]
    return user_id


def read_from_table(
    table_name: str,
    select_columns: List,
    where_column: str = None,
    where_value: Union[str, int] = None,
    where_clause: str = "=",
) -> List:
    columns = ", ".join(select_columns)
    if isinstance(where_value, str):
        where_value = '"' + where_value + '"'
    sql = f"SELECT {columns} from auroradb.{table_name} where {where_column} {where_clause} {where_value}"
    res = execute_sql(sql)["records"]
    return [{name: list(value.values())[0] for name, value in zip(select_columns, row)} for row in res]


def get_user_int_id(user_guid: str) -> int:
    uuid.UUID(user_guid)  # check uuid is valuid
    res = read_from_table(
        table_name="Users", select_columns=["user_id"], where_column="user_guid", where_value=user_guid
    )[0]
    return res["user_id"]


def get_spotify_user_details(user_id: int) -> Dict[str, str]:
    res = read_from_table(
        table_name="SpotifyUsers",
        select_columns=["spotify_user_id", "spotify_access_token", "spotify_refresh_token"],
        where_column="user_id",
        where_value=user_id,
    )[0]
    return res


def get_room_id_from_guid(room_guid: str) -> int:
    uuid.UUID(room_guid)  # check uuid is valuid
    res = read_from_table(
        table_name="Rooms", select_columns=["room_id"], where_column="room_guid", where_value=room_guid
    )[0]
    return res["room_id"]


def get_song_id_from_guid(song_guid: str) -> int:
    uuid.UUID(song_guid)  # check uuid is valuid
    res = read_from_table(
        table_name="Songs", select_columns=["song_id"], where_column="song_guid", where_value=song_guid
    )[0]
    return res["song_id"]


def get_room_guid_from_code(room_code: str) -> str:
    if (len(room_code) != 6) or (not room_code.isalpha()):
        raise ValueError("Invalid Room Code")
    res = read_from_table(
        table_name="Rooms", select_columns=["room_guid"], where_column="room_code", where_value=room_code
    )[0]
    return res["room_guid"]


def update_access_token(spotify_user_id: int, token: str):
    sql = f"""
    UPDATE SpotifyUsers
    SET spotify_access_token = :token
    WHERE spotify_user_id = :spotify_user_id;
    """
    params = [
        {"name": "token", "value": {"stringValue": token}},
        {"name": "spotify_user_id", "value": {"longValue": spotify_user_id}},
    ]
    execute_sql(sql)


def get_room_queue(room_guid: str) -> List:
    uuid.UUID(room_guid)  # check uuid is valuid
    room_id = get_room_id_from_guid(room_guid)
    sql = f"""
    SELECT
        song_guid
        ,song_uri
        ,song_name
        ,song_artist
        ,song_album_url
        ,is_inactive
        ,rs.insert_time
        ,is_played,
        is_removed
    from auroradb.RoomSongs rs
    LEFT JOIN auroradb.Songs s
        on rs.song_id = s.song_id
    where room_id = :room_id
    """
    select_columns = [
        "song_guid",
        "song_uri",
        "song_name",
        "song_artist",
        "song_album_url",
        "is_inactive",
        "insert_time",
        "is_played",
        "is_removed",
    ]
    params = [
        {"name": "room_id", "value": {"longValue": room_id}},
    ]
    res = execute_sql(sql, params)["records"]
    room_songs = [{name: list(value.values())[0] for name, value in zip(select_columns, row)} for row in res]
    return room_songs


def store_song_in_queue(song: Dict[str, str]):
    room_id = get_room_id_from_guid(song["room_guid"])
    song_guid = str(uuid.uuid4())
    # TODO deal with SQL injection here
    sql = f"""
    insert into Songs
    (song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
    VALUES
    (:song_guid, :song_uri, :song_name, :song_artist, :song_album_url,
    now(), now());
    """
    params = [
        {"name": "song_guid", "value": {"stringValue": song_guid}},
        {"name": "song_uri", "value": {"stringValue": song["song_uri"]}},
        {"name": "song_name", "value": {"stringValue": song["song_name"]}},
        {"name": "song_artist", "value": {"stringValue": song["song_artist"]}},
        {"name": "song_album_url", "value": {"stringValue": song["song_album_url"]}},
    ]
    execute_sql(sql, params)
    song_id = get_song_id_from_guid(song_guid)
    sql = f"""
    insert into RoomSongs
    (room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
    VALUES
    (:room_id, :song_id, false, now(), false, false, false);
    """
    params = [
        {"name": "room_id", "value": {"longValue": room_id}},
        {"name": "song_id", "value": {"longValue": song_id}},
    ]
    execute_sql(sql, params)


def get_room_info_for_playlist_addition(room_guid: str) -> List:
    uuid.UUID(room_guid)  # check uuid is valuid
    sql = f"""
    SELECT
        room_code
        ,spotify_user_username
    from auroradb.Rooms r
    LEFT JOIN auroradb.SpotifyUsers su
        on r.owner_user_id = su.user_id
    where room_guid = :room_guid
    """
    select_columns = ["room_code", "spotify_user_username"]
    params = [
        {"name": "room_guid", "value": {"stringValue": room_guid}},
    ]
    res = execute_sql(sql, params)["records"]
    room_info = [{name: list(value.values())[0] for name, value in zip(select_columns, row)} for row in res]
    return room_info


def get_active_rooms():
    sql = """
        SELECT room_id, room_guid FROM auroradb.Rooms
        where is_inactive = false
    """
    res = execute_sql(sql)["records"]
    select_columns = ["room_id", "room_guid"]
    rooms = [{name: list(value.values())[0] for name, value in zip(select_columns, row)} for row in res]
    return rooms


def get_next_song(room_id):
    sql = f"""
        SELECT 
            room_songs_id
            ,song_uri
            ,is_added_to_playlist
        FROM RoomSongs rs
        JOIN Songs s
            on rs.song_id = s.song_id
        where is_played = false and is_removed = false and room_id = :room_id
        ORDER BY rs.insert_time
        LIMIT 1
    """
    params = [
        {"name": "room_id", "value": {"longValue": room_id}},
    ]
    res = execute_sql(sql, params)["records"]
    select_columns = ["room_songs_id", "song_uri", "is_added_to_playlist"]
    next_song = [{name: list(value.values())[0] for name, value in zip(select_columns, row)} for row in res][0]
    return next_song


def update_db_add_song_played(room_songs_id):
    sql = "update RoomSongs set is_played = true where room_songs_id=:room_songs_id"
    params = [
        {"name": "room_songs_id", "value": {"longValue": room_songs_id}},
    ]
    execute_sql(sql, params)


def update_db_song_added_to_playlist(room_songs_id):
    sql = "update RoomSongs set is_added_to_playlist = true where room_songs_id=:room_songs_id"
    params = [
        {"name": "room_songs_id", "value": {"longValue": room_songs_id}},
    ]
    execute_sql(sql, params)
