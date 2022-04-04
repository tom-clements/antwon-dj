import React, { FC, CSSProperties } from 'react';
import { TransitionGroup, Transition, TransitionStatus } from 'react-transition-group';

interface Props {
    in: boolean;
    startHeight: CSSProperties['height'];
    endHeight: CSSProperties['height'];

    /**
     * Animation duration in milliseconds.
     * Default: 200 ms
     */
    duration?: number;

    style?: CSSProperties;
}

export const FauxAnimateHeight: FC<Props> = props => {
    const duration = props.duration ?? 200;
    const baseTransitionStyles: { [status in TransitionStatus]: CSSProperties } = {
        entering: { display: 'none', visibility: 'hidden' },
        entered: { display: 'block', visibility: 'visible' },
        exiting: { display: 'none', visibility: 'hidden' },
        exited: { display: 'none', visibility: 'hidden' },
        unmounted: {},
    };
    const expandedTransitionStyles: { [status in TransitionStatus]: CSSProperties } = {
        entering: { transform: 'translate(0, 0)' },
        entered: { transform: 'translate(0, 0)' },
        exiting: { transform: `translate(0, ${props.startHeight})` },
        exited: { transform: `translate(0, ${props.startHeight})` },
        unmounted: {},
    };

    return (
        <TransitionGroup component={null}>
            {!props.in && <Transition unmountOnExit={true} mountOnEnter={false} timeout={duration}>
                {state => (
                    <div style={{
                        ...props.style,
                        height: props.startHeight,
                        transition: `${duration}ms ease-out`,
                        ...baseTransitionStyles[state]
                    }}>
                        {props.children}
                    </div>
                )}
            </Transition>}
            {props.in && <Transition timeout={duration}>
                {state => (
                    <div style={{
                        ...props.style,
                        height: props.endHeight,
                        transition: `${duration}ms ease-out`,
                        ...expandedTransitionStyles[state]
                    }}>
                        {props.children}
                    </div>
                )}
            </Transition>}
        </TransitionGroup>
    );
};
