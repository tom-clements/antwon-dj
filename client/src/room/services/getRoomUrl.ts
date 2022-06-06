import { getClientBaseUrl } from 'config/getClientBaseUrl';

export const getRelativeRoomUrl = (roomCode: string) => {
    return `/room/${roomCode}`;
};

export const getFullRoomUrl = (roomCode: string) => {
    const clientBaseUrl = getClientBaseUrl();
    const relative = getRelativeRoomUrl(roomCode);
    return `${clientBaseUrl.replace(/\/+$/, '')}${relative}`;
};
