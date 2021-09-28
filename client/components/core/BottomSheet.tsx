import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';

interface Props {
    /**
     * Remaining height of the background shown when expanded in pixels
     */
    bleedingHeight?: number;

    /**
     * Height of pullable top section in pixels
     */
    pullBoxHeight?: number;

    /**
     * Content to display inside the pull box
     */
    pullBoxContent?: JSX.Element;

    /**
     * Override the default pull icon.
     * This is absolutely positioned in the pull box.
     */
    pullIcon?: JSX.Element;
}

const Root = styled(Box)`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const ExpandableArea = styled(Collapse)`
    width: 100vw;
`;

const SheetArea = styled(Paper)`
    display: flex;
    flex-direction: column;
`;

const PullBox = styled(Paper)`
    border-radius: 18px 18px 0 0;
    cursor: pointer;
    position: relative;
    width: 100vw;
    overflow: hidden;
    padding-top: 8px;
`;

const DefaultPuller = styled(Box)`
    width: 32px;
    height: 3px;
    background: ${props => props.theme.palette.mode === 'light' ? grey[600] : grey[700]};
    border-radius: 16px;
    position: absolute;
    left: calc(50% - 16px);
    top: 8px;
`;

const ContentBox = styled(Box)`
    flex-grow: 1;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    overflow: hidden;
`;

export const BottomSheet: FC<Props> = props => {
    const [open, setOpen] = useState(false);
    const handlers = useSwipeable({
        onSwipedUp: () => setOpen(true),
        onSwipedDown: () => setOpen(false),
    });

    const heightOffset = props.bleedingHeight ?? 16;
    const pullBoxHeight = props.pullBoxHeight ?? 78;
    const sheetMinHeight = `calc(100vh - ${heightOffset + pullBoxHeight}px)`;
    const contentHeight = open ? sheetMinHeight : `calc(54vh - ${pullBoxHeight})`;

    return (
        <Root>
            <ExpandableArea in={open} collapsedSize={"54vh"}>
                <PullBox
                    {...handlers}
                    onClick={() => setOpen(!open)}
                    sx={{ height: pullBoxHeight }}
                    elevation={3}
                    square
                >
                    {props.pullIcon ?? <DefaultPuller />}
                    {props.pullBoxContent}
                </PullBox>
                <SheetArea sx={{ minHeight: sheetMinHeight }} elevation={11} square>
                    <ContentBox sx={{ height: open ? contentHeight : "auto" }}>
                        {props.children}
                    </ContentBox>
                </SheetArea>
            </ExpandableArea>
        </Root>
    );
}
