import type { RootState } from 'model/Store';
import type { ThemeMode } from 'styles/model/ThemeMode';
import { Themes } from 'styles/model/Themes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultThemeKey, defaultThemeMode } from 'styles/services/getTheme';

interface ThemeState {
    theme: Themes;
    mode: ThemeMode;
}

const initialState = (): ThemeState => ({
    theme: defaultThemeKey,
    mode: defaultThemeMode,
});

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState(),
    reducers: {
        setTheme: (state, action: PayloadAction<Themes>) => ({
            ...state,
            theme: action.payload,
        }),
        setMode: (state, action: PayloadAction<ThemeMode>) => ({
            ...state,
            mode: action.payload,
        }),
        reset: () => initialState(),
    },
});

export const themeActions = themeSlice.actions;

export const selectThemeState = (state: RootState) => state.theme;
