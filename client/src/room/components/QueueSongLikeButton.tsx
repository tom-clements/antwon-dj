import type { FC, MouseEvent } from 'react';
import type { StyleProps } from 'common/model/ReactTypes';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface Props {
    isLiked: boolean;
    likeCount: number;
    onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
}

const getLikeCountText = (likeCount: number) => likeCount > 99 ? '99+' : `${likeCount}`;

const LikeCountButtonImplementation: FC<Props & StyleProps> = props => {
    return (
        <IconButton onClick={props.onClick} className={props.className} style={props.style}>
            {props.children}
            <svg className="like-count-number-container" viewBox="0 0 56 18">
                <text
                    className="like-count-number"
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    {getLikeCountText(props.likeCount)}
                </text>
            </svg>
        </IconButton>
    );
};

const LikeCountButton = styled(LikeCountButtonImplementation)`
    & .like-count-number-container {
        width: 100%;
        padding: 12px;
        position: absolute;
    }

    & .like-count-number-container {
        font-weight: bold;
        fill: ${props => props.isLiked ? props.theme.palette.grey['900'] : props.theme.palette.grey['100']};
    }
`;

export const QueueSongLikeButton: FC<Props> = props => {
    return (
        <LikeCountButton {...props}>
            {props.isLiked ? <Favorite /> : <FavoriteBorder />}
        </LikeCountButton>
    );
};
