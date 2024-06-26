import React, { CSSProperties, FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { UserFab } from 'user/components/UserFab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { FauxAnimateHeight } from 'common/components/FauxAnimateHeight';

interface Props {
    /**
     * Content to display inside the pull box
     */
    pullBoxContent?: (isOpen: boolean) => JSX.Element;
}

const Root = styled(Box)`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const SheetBox = styled(Box)`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
    border-radius: 18px 18px 0 0;
`;

const PullBox = styled(Paper)`
    min-height: 16px;
    padding-top: 24px;
    cursor: pointer;
    flex-shrink: 0;
    flex-grow: 0;
`;

const ContentBox = styled(Paper)`
    flex-shrink: 0;
    flex-grow: 1;
`;

const ArrowBox = styled(Box)`
    width: 32px;
    position: absolute;
    left: calc(50% - 16px);
    top: 0;
`;

/**
 * todo: pass this in a more emotion way
 */
const expandableStyle: CSSProperties = {
    width: '100%',
    borderRadius: '18px 18px 0 0',
    position: 'relative',
};

// TODO ideally, UserFab shouldn't be here, but "absolutes"; dom ordering.
// The root container here should be pulled out to resolve.

export const BottomSheet: FC<Props> = props => {
    const [open, setOpen] = useState(false);
    const handlers = useSwipeable({
        onSwipedUp: () => setOpen(true),
        onSwipedDown: () => setOpen(false),
    });

    return (
        <Root>
            <UserFab />
            <FauxAnimateHeight in={open} startHeight={'50%'} endHeight={'100%'} style={expandableStyle}>
                <SheetBox>
                    <PullBox
                        {...handlers}
                        onClick={() => setOpen(!open)}
                        elevation={1}
                        square
                    >
                        <ArrowBox>
                            {
                                open
                                    ? <ArrowDropDown htmlColor={grey[500]} fontSize={'large'} />
                                    : <ArrowDropUp htmlColor={grey[500]} fontSize={'large'} />
                            }
                        </ArrowBox>
                        {props.pullBoxContent && props.pullBoxContent(open)}
                    </PullBox>
                    <ContentBox elevation={0} square>
                        {props.children}
                    </ContentBox>
                </SheetBox>
            </FauxAnimateHeight>
        </Root>
    );
};
