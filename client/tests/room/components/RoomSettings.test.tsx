import type { Dependencies } from 'common/services/DependencyContext';
import type { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { RoomSettings } from 'room/components/RoomSettings';
import { SettingsView } from 'common/components/SettingsView';
import { RoomSettingsMenu } from 'room/components/RoomSettingsMenu';
import { UseRoomSettingActions } from 'room/hooks/useRoomSettingActions';

jest.mock('common/components/SettingsView', () => ({
    __esModule: true,
    SettingsView: (props: ComponentProps<typeof SettingsView>) => (
        <div id='settingsView' data-title={props.title} data-on-go-back={props.onGoBack?.toString()}>
            {props.children}
        </div>
    ),
}));

jest.mock('room/components/RoomSettingsMenu', () => ({
    __esModule: true,
    RoomSettingsMenu: (props: ComponentProps<typeof RoomSettingsMenu>) => (
        <div data-actions={JSON.stringify(props.actions)}>Test</div>
    ),
}));

function testRender(
    deps: Partial<Dependencies>,
    props?: ComponentProps<typeof RoomSettings>
) {
    return render(
        <DependencyProvider {...deps}>
            <RoomSettings {...props} />
        </DependencyProvider>
    );
}

const actions: ReturnType<UseRoomSettingActions> = {
    clearQueue: jest.fn(),
    deleteRoom: jest.fn(),
};
const useRoomSettingActions: UseRoomSettingActions = () => actions;

const goBackAction = jest.fn();

describe('<RoomSettings />', () => {
    it('renders <SettingsView /> with <RoomSettingsMenu />', () => {
        const { getByText } = testRender({
            useBreadcrumbs: () => ({ isRoot: false, goBack: goBackAction }),
            useRoomSettingActions,
        });

        const menu = getByText('Test');
        expect(menu).toHaveAttribute('data-actions', JSON.stringify(actions));

        const settingsView = menu.parentElement;
        expect(settingsView).toHaveAttribute('data-title', 'Room Settings');
        expect(settingsView).toHaveAttribute('data-on-go-back', goBackAction.toString());
    });
});
