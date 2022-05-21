import type { HF } from 'common/model/HookFunction';
import type { ThemeMode } from 'styles/model/ThemeMode';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'model/Store';
import { selectThemeState, themeActions } from 'styles/services/themeSlice';
import { isDarkMode } from 'styles/services/isDarkMode';

interface Return {
    mode: ThemeMode;
    toggle: () => void;
}

export type UseDarkMode = HF<void, Return>;

export const useDarkMode: UseDarkMode = () => {
    const dispatch = useAppDispatch();
    const { mode } = useAppSelector(selectThemeState);
    const { setMode } = themeActions;

    return {
        mode,
        toggle: useCallback(
            () => dispatch(setMode(isDarkMode(mode) ? 'light' : 'dark')),
            [dispatch, setMode, mode]),
    };
};
