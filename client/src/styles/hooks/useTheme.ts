import type { HF } from 'common/model/HookFunction';
import type { Theme } from 'styles/model/theme';
import { useSelector } from 'common/services/createStore';
import { useMemo } from 'react';
import { getTheme } from 'styles/services/getTheme';
import { selectThemeState } from 'styles/services/themeSlice';

export type UseTheme = HF<void, Theme>; 

export const useTheme = () => {
    const { theme, mode } = useSelector(selectThemeState);
    return useMemo(() => getTheme(theme, mode), [theme, mode]);
};
