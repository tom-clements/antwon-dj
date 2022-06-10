import { UseSongActions } from 'room/hooks/useSongActions';

export const mockUseSongActions = (props: Partial<ReturnType<UseSongActions>> = {}): UseSongActions => () => ({
    likeToggle: props.likeToggle ?? (() => undefined),
    deleteSong: props.deleteSong ?? (() => undefined),
});
