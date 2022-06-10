import type { RoomPollingIntervalConfiguration } from 'room/model/RoomPollingIntervalConfiguration';

/**
 * @returns room polling intervals in ms
 */
export const getRoomPollingInterval = (): RoomPollingIntervalConfiguration => {
    return {
        playing: 1000,
        queue: 5000,
    };
};
