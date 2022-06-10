import { debounce } from 'lodash';
import type { HF } from 'common/model/HookFunction';
import { useMemo } from 'react';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
    songId: string;

    isLoggedIn: boolean;
    isLiked: boolean;
    isRoomOwner: boolean;
}

interface Return {
    likeToggle: () => void;
    deleteSong: () => void;
}

export type UseSongActions = HF<Props, Return>;

export const useSongActions: UseSongActions = props => {
    const { roomId, songId, isLiked, isLoggedIn, isRoomOwner } = props;
    const [like] = roomApi.endpoints.like.useMutation();
    const [unlike] = roomApi.endpoints.unlike.useMutation();

    const likeToggle = useMemo(
        () => debounce(
            () => {
                if (!isLoggedIn) return;
                isLiked ? unlike({ roomId, songId }) : like({ roomId, songId });
            },
            400,
            { leading: true }),
        [like, unlike, isLiked, isLoggedIn, roomId, songId]);

    const deleteSong = useMemo(
        () => debounce(
            () => {
                if (!isLoggedIn) return;
                if (!isRoomOwner) return;
                // TODO add delete song endpoint
            },
            400,
            { leading: true }),
        [isRoomOwner, isLoggedIn]);

    return {
        likeToggle,
        deleteSong,
    };
};
