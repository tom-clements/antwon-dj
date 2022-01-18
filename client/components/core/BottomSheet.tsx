import React, { CSSProperties, FC, useState } from 'react';
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config, SpringRef } from '@react-spring/web'
import { grey } from '@mui/material/colors';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { useWindowBounds } from 'model/hooks/useWindowBounds';
import * as styles from 'components/core/BottomSheet.styles'

export const defaultInitialHeightRatio = 0.5
export const defaultSheetTopOffset = 30
export const defaultWindowInnerHeight = 0

interface Props {
    /**
     * Initial height ratio of the window for the sheet.
     * 0 is the bottom of the window, 1 is the top.
     * @default `defaultInitialHeightRatio`
     */
    initialHeightRatio?: number

    /**
     * Spacing between sheet and the top of the window
     * @default `defaultSheetTopOffset`
     */
    sheetTopOffset?: number

    /**
     * Content to display inside the pull box
     */
    pullBoxContent?: (isOpen: boolean) => JSX.Element;
}

/**
 * @note Positive is down.
 */
export type SheetApi = SpringRef<{ y: number }>

export interface SheetBounds {
    /**
     * Initial position of the sheet in the y-direction 
     */
    startPosition: number;

    /**
     * End position of the sheet in the y-direction 
     */
    endPosition: number;

    /**
     * Maximum sheet displacement in the y-direction 
     */
    maxDisplacement: number;
}

export interface SheetActionProps extends SheetBounds {
    /**
     * Reference to the Sheet API - powered by @react-spring
     */
    api: SheetApi;

    /**
     * 
     * @note Positive is down.
     */
    my: number;

    /**
     * Velocity in the y-direction.
     * @note Positive is down.
     */
    vy: number;
}

/**
 * Open the sheet to final position
 * If the user has exceeded the end, wobble back.
 */
export const openSheet = (props: SheetActionProps) => {
    props.api.start({
        y: props.endPosition,
        immediate: false,
        config: props.maxDisplacement > props.my
            ? config.wobbly
            : config.stiff
    });
}

/**
 * Close the sheet to the initial position
 */
export const closeSheet = (props: SheetActionProps) => {
    props.api.start({
        y: props.startPosition,
        immediate: false,
        config: {
            ...config.stiff,
            velocity: props.vy
        }
    });
}

export const followFinger = (props: SheetActionProps) => {
    props.api.start({
        y: props.startPosition + props.my,
        immediate: true
    });
}

export const BottomSheet: FC<Props> = props => {
    const {
        initialHeightRatio = defaultInitialHeightRatio,
        sheetTopOffset = defaultSheetTopOffset
    } = props;

    const {
        innerHeight: windowHeight = defaultWindowInnerHeight
    } = useWindowBounds();

    const bounds = {
        startPosition: initialHeightRatio * windowHeight,
        endPosition: sheetTopOffset,
        maxDisplacement: Math.abs(sheetTopOffset - initialHeightRatio * windowHeight)
    };

    const [isOpen, setIsOpen] = useState(false);
    const [{ y }, api] = useSpring(() => ({ y: bounds.startPosition }));

    const open = (my: number, vy: number) => {
        openSheet({ api, my, vy, ...bounds });
        setIsOpen(true);
    }

    const close = (my: number, vy: number) => {
        closeSheet({ api, my, vy, ...bounds });
        setIsOpen(false);
    }

    const follow = (my: number, vy: number) => {
        followFinger({ api, my, vy, ...bounds });
    }

    const bind = useDrag(
        ({ tap, cancel, velocity: [, vy], direction: [, dy], movement: [, my] }) => {
            if (!tap) {
                if (dy < 0) { // Drag up
                    if (my < -bounds.maxDisplacement - sheetTopOffset) {
                        cancel();
                    } else {
                        follow(my, vy);
                    }

                    if (my < -bounds.maxDisplacement / 2 || vy > 0.5) {
                        open(my, vy);
                    } else {
                        close(my, vy);
                    }
                } else { // Drag down
                    if (my > 0) {
                        cancel();
                    } else {
                        follow(my, vy);
                    }

                    if (my > -bounds.maxDisplacement / 2 || vy > 0.5) {
                        close(my, vy);
                    } else {
                        open(my, vy);
                    }
                }
            }
        },
        {
            from: () => isOpen
                ? [bounds.startPosition, y.get()]
                : [bounds.endPosition, y.get()],
            filterTaps: true,
            bounds: {
                top: bounds.endPosition,
                right: 0,
                bottom: bounds.startPosition,
                left: 0
            },
            delay: 1000,
            rubberband: true
        }
    )

    return (
        <styles.Root>
            <styles.Sheet
                {...bind()}
                style={{ y, height: `calc(100% - ${sheetTopOffset}px` }}
            >
                <styles.SheetBox>
                    <styles.PullBox elevation={3} square>
                        <styles.ArrowBox>
                            {
                                isOpen
                                    ? <ArrowDropDown htmlColor={grey[500]} fontSize={'large'} />
                                    : <ArrowDropUp htmlColor={grey[500]} fontSize={'large'} />
                            }
                        </styles.ArrowBox>
                        {props.pullBoxContent && props.pullBoxContent(true)}
                    </styles.PullBox>
                    <styles.ContentBox
                        elevation={11}
                        square
                        style={{
                            touchAction: isOpen ? "auto" : "none"
                        }}
                    >
                        {props.children}
                    </styles.ContentBox>
                </styles.SheetBox>
            </styles.Sheet>
        </styles.Root>
    );
};
