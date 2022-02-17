CREATE TABLE antwontest.SpotifyUsers (
    spotify_user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spotify_user_guid varchar(36) NOT NULL,
    user_id int,
    spotify_user_username varchar(50),
    spotify_user_name varchar(50),
    spotify_profile_image_url varchar(500),
    spotify_access_token varchar(500),
    spotify_refresh_token varchar(500)
    insert_time datetime
);

CREATE TABLE antwontest.Users (
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_guid varchar(36) NOT NULL,
    cognito_access_token varchar(500),
    cognito_refresh_token varchar(500),
    create_time datetime
);

CREATE TABLE antwontest.Rooms (
    room_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_guid varchar(36) NOT NULL,
    room_code varchar(6),
    is_inactive boolean,
    owner_user_id int,
    create_time datetime
);

CREATE TABLE antwontest.Songs (
    song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    song_guid varchar(500) NOT NULL,
    song_uri varchar(500),
    song_name varchar(500),
    song_artist varchar(500),
    song_album_url varchar(500),
    insert_time datetime,
    last_accessed datetime
);

CREATE TABLE antwontest.RoomSongs (
    room_song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_song_guid varchar(500) NOT NULL,
    room_id int,
    song_id int,
    is_inactive boolean,
    insert_time datetime,
    is_played boolean,
    is_removed boolean,
    is_added_to_playlist boolean
);

CREATE TABLE antwontest.RoomSongLikes (
    room_song_like_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_song_like_guid varchar(500) NOT NULL,
    room_songs_id int,
    user_id int,
    like_value int,
    create_time datetime
);

insert into antwontest.Users
(user_guid, create_time)
VALUES
("1962e800-e543-4a31-9b9f-49ee9e82d52c", now());

insert into antwontest.Rooms
(room_guid, room_code, is_inactive, owner_user_id, create_time)
VALUES
("1fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa", "ABCDEF", false, 1, now());

insert into antwontest.RoomSongs
(room_song_guid, room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
("7aa3c95c-7406-4a47-af5a-5c087fa4c6b1", 1, 1, false, now(), false, false, false);

insert into antwontest.RoomSongs
(room_songs_guid, room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
("02d451a2-39d3-49b7-8c3b-4953470a22df", 1, 2, false, now(), false, false, false);

insert into antwontest.Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('ddd1de01-6eee-4bdf-85c6-d06c83696972', 'spotify:track:1u8c2t2Cy7UBoG4ArRcF5g',
'Blank Space', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());

insert into antwontest.Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('6f422b09-60a1-4673-9e55-326e32117b6c', 'spotify:track:0cqRj7pUJDkTCEsJkx8snD',
'Shake It Off', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());

insert into antwontest.RoomSongLikes
(room_song_like_guid, room_songs_id, user_id, like_value, create_time)
VALUES
("55572d31-41b5-4deb-b3b9-f19f13e01221", 1, 1, 1, now());