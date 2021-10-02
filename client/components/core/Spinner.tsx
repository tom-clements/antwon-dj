import { isNil } from 'lodash';
import { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

interface Props {
    /**
     * Relative to 30px 
     */
    scale?: number;
}

const fillTransition = (from: string, to: string) => keyframes`
    from {
        fill: ${from};
    }
    to {
        fill: ${to};
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const SpinnerContainer = styled((props: PropsWithChildren<Props>) => (
    <svg {...props}
        width={!isNil(props.scale) ? `${props.scale * 30}px` : '30px'}
        height={!isNil(props.scale) ? `${props.scale * 30}px` : '30px'}
    >
        {props.children}
    </svg>
))`
    & rect {
        opacity: 0.5;
        transform: scale(${props => (!isNil(props.scale) ? props.scale * 30 : 30) / 6});
    }

    & rect.one {
        animation:
            ${fadeIn} 1s ease-in-out infinite alternate-reverse,
            ${props => fillTransition(props.theme.palette.primary.light, props.theme.palette.secondary.dark)} 5s steps(5, jump-end) infinite reverse
            ;
    }

    & rect.two {
        animation:
            ${fadeIn} 2s ease-in-out infinite alternate,
            ${props => fillTransition(props.theme.palette.error.dark, props.theme.palette.error.light)} 4s steps(5, jump-end) infinite alternate-reverse
            ;
    }

    & rect.three {
        animation:
            ${fadeIn} 3s ease-in-out infinite alternate-reverse,
            ${props => fillTransition(props.theme.palette.warning.light, props.theme.palette.warning.dark)} 3s steps(5, jump-end) infinite reverse
            ;
    }

    & rect.four {
        animation:
            ${fadeIn} 4s ease-in-out infinite alternate,
            ${props => fillTransition(props.theme.palette.info.dark, props.theme.palette.info.light)} 2s steps(5, jump-end) infinite alternate-reverse
            ;
    }

    & rect.five {
        animation:
            ${fadeIn} 5s ease-in-out infinite alternate-reverse,
            ${props => fillTransition(props.theme.palette.success.light, props.theme.palette.success.dark)} 1s steps(5, jump-end) infinite reverse
            ;
    }
`;

export const Spinner: FC<Props> = props => {
    return (
        <SpinnerContainer scale={props.scale}>
            <rect width="1" height="1" x="0.5" y="4.5" className="block one" />
            <rect width="1" height="1" x="0.5" y="3.5" className="block two" />
            <rect width="1" height="1" x="0.5" y="2.5" className="block three" />
            <rect width="1" height="1" x="0.5" y="1.5" className="block four" />
            <rect width="1" height="1" x="0.5" y="0.5" className="block five" />
            <rect width="1" height="1" x="2.5" y="0.5" className="block one" />
            <rect width="1" height="1" x="2.5" y="4.5" className="block two" />
            <rect width="1" height="1" x="2.5" y="3.5" className="block three" />
            <rect width="1" height="1" x="2.5" y="2.5" className="block four" />
            <rect width="1" height="1" x="2.5" y="1.5" className="block five" />
            <rect width="1" height="1" x="4.5" y="1.5" className="block one" />
            <rect width="1" height="1" x="4.5" y="0.5" className="block two" />
            <rect width="1" height="1" x="4.5" y="4.5" className="block three" />
            <rect width="1" height="1" x="4.5" y="3.5" className="block four" />
            <rect width="1" height="1" x="4.5" y="2.5" className="block five" />
        </SpinnerContainer>
    );
};
