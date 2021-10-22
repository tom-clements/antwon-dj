import { FC, ReactElement } from 'react';

interface RadialQRBackgroundProps {
    children: JSX.IntrinsicElements['stop'][];
}

export const RadialQRBackground: FC<RadialQRBackgroundProps> = props => {
    return (
        <radialGradient id={'codeBackground'}>
            {props.children}
        </radialGradient>
    );
};

export type QRMaskBackgrounds
    = ReactElement<RadialQRBackgroundProps>
