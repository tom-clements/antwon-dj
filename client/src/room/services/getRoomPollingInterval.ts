import type { RoomPollingIntervalConfiguration } from 'room/model/RoomPollingIntervalConfiguration';

/**
 * @returns room polling intervals in ms
 */
export const getRoomPollingInterval = (): RoomPollingIntervalConfiguration => {
    return {
        playing: 0,
        queue: 0,
        likes: 0,
    };
};
