from chalicelib.models.data_queries.next_song import NextSong


def get_example_next_song(room_song_guid: str = "room_song_guid", song_uri: str = "example_song_uri") -> NextSong:
    return NextSong(
        room_song_guid=room_song_guid,
        song_uri=song_uri,
        is_added_to_playlist=False,
        song_name="song_name1",
        song_artist="artist1, artist2",
        is_played=False,
    )
