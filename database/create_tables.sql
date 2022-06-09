CREATE TABLE antwon.SpotifyUsers (
    spotify_user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spotify_user_guid varchar(36) NOT NULL,
    user_id int NOT NULL,
    spotify_user_username varchar(50) NOT NULL,
    spotify_user_name varchar(50) NOT NULL,
    spotify_profile_image_url varchar(500) NOT NULL,
    spotify_access_token varchar(500) NOT NULL,
    spotify_refresh_token varchar(500) NOT NULL,
    insert_time datetime NOT NULL,
    CONSTRAINT constraint_user_id UNIQUE (user_id)
);

CREATE TABLE antwon.Users (
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_username varchar(36) NOT NULL,
    id_token varchar(2000) NOT NULL,
    create_time datetime NOT NULL,
    CONSTRAINT constraint_username UNIQUE (user_username)
);


CREATE TABLE antwon.Rooms (
    room_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_guid varchar(36) NOT NULL,
    room_code varchar(6) NOT NULL,
    is_inactive boolean NOT NULL,
    owner_user_id int NOT NULL,
    create_time datetime NOT NULL
);


CREATE TABLE antwon.Songs (
    song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    song_guid varchar(500) NOT NULL,
    song_uri varchar(500),
    song_name varchar(500),
    song_artist varchar(500),
    song_album_url varchar(500),
    insert_time datetime NOT NULL,
    last_accessed datetime NOT NULL,
    CONSTRAINT constraint_song_uri UNIQUE (song_uri)
);

CREATE TABLE antwon.RoomSongs (
    room_song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_song_guid varchar(500) NOT NULL,
    room_id int NOT NULL,
    song_id int NOT NULL,
    is_inactive boolean NOT NULL,
    insert_time datetime NOT NULL,
    is_played boolean NOT NULL,
    is_removed boolean NOT NULL,
    is_added_to_playlist boolean NOT NULL
);

CREATE TABLE antwon.RoomSongLikes (
    room_song_like_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_song_like_guid varchar(500) NOT NULL,
    room_song_id int NOT NULL,
    user_id int NOT NULL,
    like_value int NOT NULL,
    create_time datetime NOT NULL
);