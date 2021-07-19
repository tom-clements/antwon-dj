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
    owner_user_id varchar(36)
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
    owner_user_id int,
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
("2962e800-e543-4a31-9b9f-49ee9e82d52c")
VALUES
("5fbc1ed4-8dd0-45a8-95a2-2f8d2ffb7faa", "SOIREE", false, 1);
