import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { RoomSettingsMenu } from 'roomPortal/components/RoomSettingsMenu';
import { MenuItem } from 'common/components/MenuItem';
import { UseRoomSettingActions } from 'roomPortal/hooks/useRoomSettingActions';

jest.mock('common/components/MenuItem', () => ({
    __esModule: true,
    MenuItem: (props: ComponentProps<typeof MenuItem>) => (
        <div data-text={props.text}>
            Test
        </div>
    ),
}));

const actions: ReturnType<UseRoomSettingActions> = {
    clearQueue: jest.fn(),
    deleteRoom: jest.fn(),
};

function testRender(props: Partial<ComponentProps<typeof RoomSettingsMenu>>) {
    return render(<RoomSettingsMenu {...props} actions={props.actions ?? actions} />);
}

describe('<RoomSettingsMenu />', () => {
    it('renders a list of <RoomSettingsMenu />', () => {
        const { getAllByText } = testRender({});

        const menuItems = getAllByText('Test');
        const textEntries = menuItems.map(i => i.getAttribute('data-text'));
        expect(textEntries).toEqual([
            'Clear Queue',
            'Delete Room',
        ]);
    });
});
