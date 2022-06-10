import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { roomApi } from 'room/services/roomApi';
import { useSongLikes } from 'room/hooks/useSongLikes';
import { SongLikesModel } from 'room/model/SongLikesModel';
import { isResultedTask } from 'common/predicates/isTask';

interface Props {
    roomId: string;
    songId: string;
}

interface Return {
    songLikes: SongLikesModel | null;
    likeToggle: () => void;
    deleteSong: () => void;
}

export type UseSong = HF<Props, Return>;

export const useSong: UseSong = props => {
    const { roomId, songId } = props;
    const [like] = roomApi.endpoints.like.useMutation();
    const [unlike] = roomApi.endpoints.unlike.useMutation();

    const songLikesTask = useSongLikes(props);
    const songLikes = isResultedTask(songLikesTask) ? songLikesTask.result : null;

    const isLiked = songLikes?.isLiked ?? null;

    const likeToggle = useDebouncedCallback(
        useCallback(
            () => {
                if (!isLiked === null) return;
                isLiked ? unlike({ roomId, songId }) : like({ roomId, songId });
            },
            [like, unlike, isLiked, roomId, songId]),
        300,
        { leading: true });

    const deleteSong = useDebouncedCallback(
        useCallback(
            () => {
                // TODO add delete song endpoint
            },
            []),
        300,
        { leading: true });

    return {
        songLikes,
        likeToggle,
        deleteSong,
    };
};
