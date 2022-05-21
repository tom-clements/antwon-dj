import type { FC } from 'react';
import { LightMode, DarkMode } from '@mui/icons-material';
import { MenuItem } from 'common/components/MenuItem';
import { isDarkMode } from 'styles/services/isDarkMode';
import { UseDarkMode, useDarkMode as _useDarkMode } from 'styles/hooks/useDarkMode';

interface Props {
    /**
     * Injected `useDarkMode` hook or default implementation
     */
    useDarkMode?: UseDarkMode;
}

export const DarkModeMenuItem: FC<Props> = props => {
    const useDarkMode = props.useDarkMode ?? _useDarkMode;
    const { mode, toggle } = useDarkMode();

    const isDark = isDarkMode(mode);
    const icon = isDark ? LightMode : DarkMode;
    const text = `${isDark ? 'Light' : 'Dark'} Mode`;

    return (
        <MenuItem icon={icon} text={text} onClick={toggle} />
    );
};
