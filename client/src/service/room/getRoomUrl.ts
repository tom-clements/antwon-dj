import { getClientBaseUrl } from 'service/config/getClientBaseUrl';

export function getRelativeRoomUrl(roomCode: string) {
    return `/room/${roomCode}`;
}

export function getFullRoomUrl(roomCode: string) {
    const clientBaseUrl = getClientBaseUrl();
    const relative = getRelativeRoomUrl(roomCode);
    return `${clientBaseUrl.replace(/\/+$/, '')}${relative}`;
}
