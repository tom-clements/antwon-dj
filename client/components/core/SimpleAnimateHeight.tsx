import React, { FC, CSSProperties } from "react";
import { Transition, TransitionStatus } from 'react-transition-group';

interface Props {
    in: boolean;
    startHeight: CSSProperties["height"];
    endHeight: CSSProperties["height"];

    /**
     * Animation duration in milliseconds.
     * Default: 300 ms
     */
    duration?: number;

    style?: CSSProperties;
}

export const SimpleAnimateHeight: FC<Props> = props => {
    const duration = props.duration ?? 200;
    const transitionStyles: { [status in TransitionStatus]: CSSProperties } = {
        entering: { height: props.startHeight },
        entered: { height: props.startHeight },
        exiting: { height: props.endHeight },
        exited: { height: props.endHeight },
        unmounted: {},
    };

    return (
        <Transition in={props.in} timeout={duration}>
            {state => (
                <div style={{
                    ...props.style,
                    transition: `height ${duration}ms ease-in-out`,
                    ...transitionStyles[state]
                }}>
                    {props.children}
                </div>
            )}
        </Transition>
    );
};
