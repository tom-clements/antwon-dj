import { a } from '@react-spring/web'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const Root = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

export const Sheet = styled(a.div)`
    z-index: 100;
    position: fixed;
    width: 100%;
    touch-action: none;
`

export const SheetBox = styled(Box)`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
    border-radius: 18px 18px 0 0;
`;

export const PullBox = styled(Paper)`
    min-height: 16px;
    padding-top: 24px;
    cursor: pointer;
    flex-shrink: 0;
    flex-grow: 0;
`;

export const ContentBox = styled(Paper)`
    flex-shrink: 0;
    flex-grow: 1;
`;

export const ArrowBox = styled(Box)`
    width: 32px;
    position: absolute;
    left: calc(50% - 16px);
    top: 0;
`;
