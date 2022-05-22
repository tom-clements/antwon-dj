import type { FC } from 'react';
import type { IconType } from 'common/model/IconType';
import { MenuItemPadding } from 'common/model/MenuItemPadding';
import { MenuItem } from 'common/components/MenuItem';
import { MenuContainer } from 'common/components/MenuContainer';
import { Clear, ClearAll } from '@mui/icons-material';
import { UseRoomSettingActions } from 'room/hooks/useRoomSettingActions';

interface Props {
    actions: ReturnType<UseRoomSettingActions>;
}

const RoomSettingItem: FC<{ icon: IconType; text: string; onClick: () => void; }> = props => {
    return (
        <MenuItem
            icon={props.icon}
            text={props.text}
            onClick={props.onClick}
            padding={MenuItemPadding.Large}
            divider={true}
        />
    );
};

export const RoomSettingsMenu: FC<Props> = props => {
    const { actions } = props;
    return (
        <MenuContainer disableGutter>
            <RoomSettingItem icon={ClearAll} text="Clear Queue" onClick={actions.clearQueue} />
            <RoomSettingItem icon={Clear} text="Delete Room" onClick={actions.deleteRoom} />
        </MenuContainer>
    );
};
