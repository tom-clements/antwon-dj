import { keyframes } from '@mui/system';

export const fillTransition = (from: string, to: string) => keyframes`
    from {
        fill: ${from};
    }
    to {
        fill: ${to};
    }
`;
