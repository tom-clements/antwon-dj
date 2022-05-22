import { Themes } from 'styles/model/Themes';
import { ThemeMode } from 'styles/model/ThemeMode';
import { twonDark, twonLight } from 'styles/themes/twon';
import { isDarkMode } from 'styles/services/isDarkMode';

export const getTheme = (themeKey: Themes, mode: ThemeMode) => {
    switch (themeKey) {
        case Themes.Twon:
            return isDarkMode(mode) ? twonDark : twonLight;
        default:
            throw new Error(`Theme '${themeKey}' does not exist`);
    }
};

export const defaultThemeKey: Themes = Themes.Twon;
export const defaultThemeMode: ThemeMode = 'dark';

export const getDefaultTheme = () => getTheme(defaultThemeKey, defaultThemeMode);
