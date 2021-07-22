USE auroradb;

DROP TABLE SpotifyUsers;
DROP TABLE Users;
DROP TABLE Rooms;
DROP TABLE Songs;
DROP TABLE RoomSongs;


CREATE TABLE SpotifyUsers (
    spotify_user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spotify_user_guid varchar(36) NOT NULL,
    user_id int,
    spotify_user_name varchar(50),
    spotify_profile_image_url varchar(500),
    spotify_access_token varchar(500),
    spotify_refresh_token varchar(500)
);

CREATE TABLE Users (
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_guid varchar(36) NOT NULL,
    cognito_access_token varchar(500),
    cognito_refresh_token varchar(500)
);

CREATE TABLE Rooms (
    room_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_guid varchar(36) NOT NULL,
    room_code varchar(6),
    is_inactive boolean,
    owner_user_id int
);

CREATE TABLE Songs (
    song_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    song_guid varchar(500) NOT NULL,
    song_uri varchar(500),
    song_name varchar(500),
    song_artist varchar(500),
    song_album_url varchar(500),
    insert_time datetime,
    last_accessed datetime
);

CREATE TABLE RoomSongs (
    room_songs_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_id int,
    song_id int,
    is_inactive boolean,
    insert_time datetime,
    is_played boolean,
    is_removed boolean,
    is_added_to_playlist boolean
);

insert into Users
(user_guid)
VALUES
("2962e800-e543-4a31-9b9f-49ee9e82d52c");

insert into Rooms
(room_guid, room_code, is_inactive, owner_user_id)
VALUES
("5fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa", "SOIREE", false, 1);

insert into RoomSongs
(room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
(1, 1, false, now(), false, false, false);

insert into RoomSongs
(room_id, song_id, is_inactive, insert_time, is_played, is_removed, is_added_to_playlist)
VALUES
(1, 2, false, now(), false, false, false);

insert into Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('ddd1de01-6eee-4bdf-85c6-d06c83696972', 'spotify:track:1u8c2t2Cy7UBoG4ArRcF5g',
'Blank Space', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());


insert into Songs
(song_guid, song_uri, song_name, song_artist, song_album_url, insert_time, last_accessed)
VALUES
('6f422b09-60a1-4673-9e55-326e32117b6c', 'spotify:track:0cqRj7pUJDkTCEsJkx8snD',
'Shake It Off', 'Taylor Swift', 'https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a',
now(), now());