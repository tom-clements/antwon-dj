import { debounce } from 'lodash';
import type { HF } from 'common/model/HookFunction';
import { useMemo } from 'react';
import { roomApi } from 'room/services/roomApi';
import { useSongLikes } from 'room/hooks/useSongLikes';
import { SongLikesModel } from 'room/model/SongLikesModel';
import { isResultedTask } from 'common/predicates/isTask';

interface Props {
    roomId: string;
    songId: string;

    isLoggedIn: boolean;
    isRoomOwner: boolean;
}

interface Return {
    songLikes: SongLikesModel | null;
    likeToggle: () => void;
    deleteSong: () => void;
}

export type UseSong = HF<Props, Return>;

export const useSong: UseSong = props => {
    const { roomId, songId, isLoggedIn, isRoomOwner } = props;
    const [like] = roomApi.endpoints.like.useMutation();
    const [unlike] = roomApi.endpoints.unlike.useMutation();

    const songLikesTask = useSongLikes(props);
    const songLikes = isResultedTask(songLikesTask) ? songLikesTask.result : null;

    const isLiked = songLikes?.isLiked ?? null;

    const likeToggle = useMemo(
        () => debounce(
            () => {
                if (!isLoggedIn || isLiked === null) return;
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
        songLikes,
        likeToggle,
        deleteSong,
    };
};
