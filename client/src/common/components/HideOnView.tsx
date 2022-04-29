import { FC } from 'react';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export const HideOnScroll: FC = props => {
    const trigger = useScrollTrigger();

    if (!props.children) return null;

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <>
                {props.children}
            </>
        </Slide>
    );
};
