export interface UserDto {
    sub: string;
    email_verified: boolean;
    name: string;
    email: string;
    username: string;
    picture: string | null;
    is_spotify_connected: boolean;
    room_code: string | null;
}
