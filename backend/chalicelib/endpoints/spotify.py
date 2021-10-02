import uuid
from typing import Dict, List
import spotipy
from chalice import Blueprint
from chalicelib.antwondb import db_queries
from chalicelib.utils import spotify, secrets


spotify_routes = Blueprint(__name__)


@spotify_routes.route("/spotifyConnect", methods=["GET"], cors=True)
def spotify_connect_get():
    user_guid = spotify_routes.current_request.query_params["user_guid"]
    url = spotify.app_Authorization() + "&state=" + str(user_guid)

    response = {"statusCode": 302, "headers": {"Location": url}}
    return response


@spotify_routes.route("/spotifySearch", methods=["GET"], cors=True)
def spotify_search_get():
    params = spotify_routes.current_request.query_params
    res = search_songs(song_query=params["query"], room_guid=params["room_guid"])
    return res


@spotify.get_spotify_session
def search_songs(spotify_session: spotipy.Spotify, song_query: str, room_guid: str) -> Dict[str, List[Dict[str, str]]]:
    result = spotify_session.search(q=song_query, type="track")
    songs = [
        {
            "id": r["uri"],
            "song_artist": ", ".join([n["name"] for n in r["artists"]]),
            "song_name": r["name"],
            "song_album_url": r["album"]["images"][0]["url"],
        }
        for i, r in enumerate(result["tracks"]["items"])
    ]
    return {"songs": songs}


@spotify_routes.route("/spotifyCallback", methods=["GET"], cors=True)
def spotify_callback_get():
    params = spotify_routes.current_request.query_params
    user_id = db_queries.get_user_int_id(params["state"])
    token = secrets.get_token(code=params["code"])
    sp = spotify.get_spotify(auth=token["access_token"])
    sp_user = sp.current_user()
    spotify_user_username = sp_user["id"]
    spotify_user_name = sp_user["display_name"]
    spotify_profile_image_url = sp_user["images"][0]["url"]
    access_token = token["access_token"]
    refresh_token = token["refresh_token"]

    sql = f"""
    INSERT INTO auroradb.SpotifyUsers
    (spotify_user_guid, user_id, spotify_user_username, spotify_user_name, spotify_profile_image_url, spotify_access_token, spotify_refresh_token)
    VALUES (:spotify_user_guid, :user_id, :spotify_user_username, :spotify_user_name, :spotify_profile_image_url, :access_token, :refresh_token);
    """
    params = [
        {"name": "spotify_user_guid", "value": {"stringValue": str(uuid.uuid4())}},
        {"name": "user_id", "value": {"longValue": user_id}},
        {"name": "spotify_user_username", "value": {"stringValue": spotify_user_username}},
        {"name": "spotify_user_name", "value": {"stringValue": spotify_user_name}},
        {"name": "spotify_profile_image_url", "value": {"stringValue": spotify_profile_image_url}},
        {"name": "access_token", "value": {"stringValue": access_token}},
        {"name": "refresh_token", "value": {"stringValue": refresh_token}},
    ]
    db_queries.execute_sql(sql, params)

    response = {"statusCode": 302, "headers": {"Location": "https://www.djantwon.com/spoitfy_auth"}}
    return response


def store_song_in_queue(song: Dict[str, str]) -> None:
    room_id = db_queries.get_room_id_from_guid(song["room_guid"])
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
    db_queries.execute_sql(sql, params)
    song_id = db_queries.get_song_id_from_guid(song_guid)
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
    db_queries.execute_sql(sql, params)


@spotify_routes.route("/spotifyCurrentlyPlaying", methods=["GET"], cors=True)
def spotify_currently_playing_get():
    room_guid = spotify_routes.current_request.query_params["room_guid"]
    res = get_currently_playing(room_guid=room_guid)
    return res


@spotify.get_spotify_session
def get_currently_playing(spotify_session: spotipy.Spotify, room_guid: str):
    r = spotify_session.currently_playing()
    empty_song = {
        "id": "1",
        "song_uri": "a",
        "song_artist": "Add Songs to Queue",
        "song_name": "No Song Playing",
        "song_album_url": "https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png",
    }

    # if there is something playing
    if r:
        # if the current playing is a song
        if r["item"]:
            r = r["item"]
            song = {
                "id": r["uri"],
                "song_artist": ", ".join([n["name"] for n in r["artists"]]),
                "song_name": r["name"],
                "song_album_url": r["album"]["images"][0]["url"],
                "song_uri": r["uri"],
            }
            return {"statusCode": 200, "song": song}
        else:
            return {"statusCode": 200, "song": empty_song}
    else:
        return {"statusCode": 200, "song": empty_song}


@spotify_routes.route("/spotifyAddToPlaylist", methods=["POST"], cors=True)
def spotify_add_to_playlist():
    body = spotify_routes.current_request.json_body
    return add_to_playlist(room_guid=body["room_guid"], song_uri=body["song_uri"])


@spotify.get_spotify_session
def add_to_playlist(spotify_session: spotipy.Spotify, room_guid: str, song_uri: str):
    room_info = db_queries.get_room_info_for_playlist_addition(room_guid)[0]
    playlists = spotify_session.current_user_playlists()
    room_code = room_info["room_code"]
    playlist_name = f"ANTWON-{room_code}"
    playlist = [p for p in playlists["items"] if p["name"] == playlist_name]
    if not playlist:
        print(f"creating playlist: {playlist_name}")
        spotify_session.user_playlist_create(
            room_info["spotify_user_username"], playlist_name, public=True, collaborative=False, description=""
        )
        playlist = [p for p in playlists["items"] if p["name"] == playlist_name]

    spotify_session.user_playlist_add_tracks(
        user=room_info["spotify_user_username"], playlist_id=playlist[0]["id"], tracks=[song_uri], position=None
    )
    return {"statusCode": 200, "body": "success"}
