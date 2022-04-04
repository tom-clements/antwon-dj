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
        setRoomPortalCode: (state, action: PayloadAction<string | null>) => ({ ...state, roomCode: action.payload }),
    },
});

export const { setRoomPortalCode } = RoomPortalSlice.actions;

export const selectRoomPortalCode = (state: RootState) => state.roomPortal.roomCode;
