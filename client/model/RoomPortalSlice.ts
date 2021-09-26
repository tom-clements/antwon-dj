import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "model/Store";

interface RoomPortalState {
    roomCode: string | null;
    shouldQueryRoomId: boolean;
}

function getInitialRoomPortalState(): RoomPortalState {
    return {
        roomCode: null,
        shouldQueryRoomId: false,
    };
}

export const RoomPortalSlice = createSlice({
    name: "roomPortal",
    initialState: getInitialRoomPortalState(),
    reducers: {
        setRoomCode: (state, action: PayloadAction<string | null>) => ({ ...state, roomCode: action.payload }),
        queryRoomId: state => ({ ...state, shouldQueryRoomId: true }),
        stopRoomIdQuery: state => ({ ...state, shouldQueryRoomId: false }),
    },
})

export const { setRoomCode, queryRoomId, stopRoomIdQuery } = RoomPortalSlice.actions;

export const selectRoomCode = (state: RootState) => state.roomPortal.roomCode;
export const selectShouldQueryRoomId = (state: RootState) => state.roomPortal.shouldQueryRoomId;
