CREATE TABLE antwon.SpotifyUsers (
    spotify_user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spotify_user_guid varchar(36) NOT NULL,
    user_id int NOT NULL,
    spotify_user_username varchar(50) NOT NULL,
    spotify_user_name varchar(50) NOT NULL,
    spotify_profile_image_url varchar(500) NOT NULL,
    spotify_access_token varchar(500) NOT NULL,
    spotify_refresh_token varchar(500) NOT NULL,
    insert_time datetime NOT NULL
);

CREATE TABLE antwon.Users (
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_username varchar(36) NOT NULL,
    create_time datetime NOT NULL
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
    last_accessed datetime NOT NULL
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
    room_songs_id int NOT NULL,
    user_id int NOT NULL,
    like_value int NOT NULL,
    create_time datetime NOT NULL
);


insert into antwon.Rooms
(room_guid, room_code, is_inactive, owner_user_id, create_time)
VALUES
("5fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa", "SOIREE", false, 1, now());

insert into antwon.RoomSongs
(room_songs_guid, room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
("7aa3c95c-7406-4a47-af5a-5c087fa4c6b1", 1, 1, false, now(), false, false, false);

insert into antwon.RoomSongs
(room_songs_guid, room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
("02d451a2-39d3-49b7-8c3b-4953470a22df", 1, 2, false, now(), false, false, false);

insert into antwon.Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('ddd1de01-6eee-4bdf-85c6-d06c83696972', 'spotify:track:1u8c2t2Cy7UBoG4ArRcF5g',
'Blank Space', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());

insert into antwon.Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('6f422b09-60a1-4673-9e55-326e32117b6c', 'spotify:track:0cqRj7pUJDkTCEsJkx8snD',
'Shake It Off', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());

insert into antwon.RoomSongLikes
(room_song_like_guid, room_songs_id, user_id, like_value, create_time)
VALUES
("55572d31-41b5-4deb-b3b9-f19f13e01221", 1, 1, 1, now());
