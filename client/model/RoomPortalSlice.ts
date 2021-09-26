import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'model/Store';

interface RoomPortalState {
    roomCode: string | null;
}

function getInitialRoomPortalState(): RoomPortalState {
    return {
        roomCode: null,
    };
}

export const RoomPortalSlice = createSlice({
    name: 'roomPortal',
    initialState: getInitialRoomPortalState(),
    reducers: {
        setRoomCode: (state, action: PayloadAction<string | null>) => ({ ...state, roomCode: action.payload }),
    },
});

export const { setRoomCode } = RoomPortalSlice.actions;

export const selectRoomCode = (state: RootState) => state.roomPortal.roomCode;
