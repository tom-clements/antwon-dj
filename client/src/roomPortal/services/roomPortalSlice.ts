import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { State } from 'common/services/createStore';

interface RoomPortalState {
    roomCode: string | null;
}

function getInitialRoomPortalState(): RoomPortalState {
    return {
        roomCode: null,
    };
}

export const roomPortalSlice = createSlice({
    name: 'roomPortal',
    initialState: getInitialRoomPortalState(),
    reducers: {
        setRoomPortalCode: (state, action: PayloadAction<string | null>) => ({ ...state, roomCode: action.payload }),
    },
});

export const { setRoomPortalCode } = roomPortalSlice.actions;

export const selectRoomPortalCode = (state: State) => state.roomPortal.roomCode;
