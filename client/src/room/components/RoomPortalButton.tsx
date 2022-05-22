import type { FC } from 'react';
import type { IconType } from 'common/model/IconType';
import Button from '@mui/material/Button';

interface Props {
    icon: IconType;
    text: string;
    onClick: () => void;
}

export const RoomPortalButton: FC<Props> = props => {
    return (
        <Button
            startIcon={<props.icon />}
            color="secondary"
            variant="outlined"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
};
