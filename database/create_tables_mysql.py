import boto3
import base64
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
Session = None


def get_secret(secret_name):
    region_name = "eu-west-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    # Decrypts secret using the associated KMS CMK.
    # Depending on whether the secret is a string or binary, one of these fields will be populated.
    if "SecretString" in get_secret_value_response:
        return json.loads(get_secret_value_response["SecretString"])
    else:
        return json.loads(base64.b64decode(get_secret_value_response["SecretBinary"]))


def create_db_engine(db_conn_string, debug_mode=False):
    return create_engine(db_conn_string,
                         echo=debug_mode,
                         pool_size=1,
                         max_overflow=0,
                         pool_recycle=3600,
                         pool_pre_ping=True,
                         pool_use_lifo=True)


def create_db_session(engine):
    global Session
    if not Session:
        Session = sessionmaker(bind=engine)
        # todo: setup connection pooling properties
    return Session()


if __name__ == "__main__":
    secrets = get_secret("antwon-rds-credentials")
    db_conn_string = f"mysql+pymysql://{secrets['username']}:{secrets['password']}@{secrets['db_proxy_endpoint']}:{secrets['port']}/antwon"
    engine = create_db_engine(db_conn_string)
    session = create_db_session(engine)
    sql1 = """
    CREATE TABLE antwon.SpotifyUsers (
        spotify_user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        spotify_user_guid varchar(36) NOT NULL,
        user_id int,
        spotify_user_username varchar(50),
        spotify_user_name varchar(50),
        spotify_profile_image_url varchar(500),
        spotify_access_token varchar(500),
        spotify_refresh_token varchar(500)
    );
    """
    sql2 = """
    CREATE TABLE antwon.Users (
        user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_guid varchar(36) NOT NULL,
        cognito_access_token varchar(500),
        cognito_refresh_token varchar(500)
    );
    """

    sql3 = """
    CREATE TABLE antwon.Rooms (
        room_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        room_guid varchar(36) NOT NULL,
        room_code varchar(6),
        is_inactive boolean,
        owner_user_id int
    );
    """

    sql4 = """
    CREATE TABLE antwon.Songs (
        song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        song_guid varchar(500) NOT NULL,
        song_uri varchar(500),
        song_name varchar(500),
        song_artist varchar(500),
        song_album_url varchar(500),
        insert_time datetime,
        last_accessed datetime
    );
    """

    sql5 = """
    CREATE TABLE antwon.RoomSongs (
        room_songs_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        room_id int,
        song_id int,
        is_inactive boolean,
        insert_time datetime,
        is_played boolean,
        is_removed boolean,
        is_added_to_playlist boolean
    );
    """

    sql6 = """
    insert into antwon.Users
    (user_guid)
    VALUES
    ("2962e800-e543-4a31-9b9f-49ee9e82d52c");
    """

    sql7 = """
    insert into antwon.Rooms
    (room_guid, room_code, is_inactive, owner_user_id)
    VALUES
    ("5fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa", "SOIREE", false, 1);
    """

    sql8 = """
    insert into antwon.RoomSongs
    (room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
    VALUES
    (1, 1, false, now(), false, false, false);
    """

    sql9 = """
    insert into antwon.RoomSongs
    (room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
    VALUES
    (1, 2, false, now(), false, false, false);
    """

    sql10 = """
    insert into antwon.Songs
    (song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
    VALUES
    ('ddd1de01-6eee-4bdf-85c6-d06c83696972', 'spotify:track:1u8c2t2Cy7UBoG4ArRcF5g',
    'Blank Space', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
    now(), now());
    """

    sql11 = """
    insert into antwon.Songs
    (song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
    VALUES
    ('6f422b09-60a1-4673-9e55-326e32117b6c', 'spotify:track:0cqRj7pUJDkTCEsJkx8snD',
    'Shake It Off', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
    now(), now());
    """


    with engine.connect() as con:
        con.execute(sql1)
        con.execute(sql2)
        con.execute(sql3)
        con.execute(sql4)
        con.execute(sql5)
        con.execute(sql6)
        con.execute(sql7)
        con.execute(sql8)
        con.execute(sql9)
        con.execute(sql10)
        con.execute(sql11)
