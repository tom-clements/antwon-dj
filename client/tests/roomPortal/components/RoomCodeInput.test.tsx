import type { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { RoomCodeInput } from 'roomPortal/components/RoomCodeInput';
import TextField from '@mui/material/TextField';

jest.mock('@mui/material/TextField', () => ({
    __esModule: true,
    default: (props: ComponentProps<typeof TextField>) => (
        <textarea
            data-testid="Test"
            data-label={props.label}
            value={(props.value as string)}
            onChange={props.onChange}
        />
    ),
}));

function testRender(props: ComponentProps<typeof RoomCodeInput>) {
    return render(<RoomCodeInput {...props} />);
}

describe('<RoomCodeInput />', () => {
    it('renders <TextField /> with roomCode', () => {
        const roomCode = 'soiree';
        const onChange = jest.fn();

        const { getByTestId } = testRender({
            roomCode,
            onChange,
        });

        const textField = getByTestId('Test');
        expect(textField).toHaveAttribute('data-label', 'room code');
        expect(textField).toHaveValue(roomCode);
    });

    describe('props.onChange', () => {
        it('returns null for empty change value', () => {
            const roomCode = 'soiree';
            const onChange = jest.fn();
            const { getByTestId } = testRender({
                roomCode,
                onChange,
            });

            fireEvent.change(getByTestId('Test'), { target: { value: '' } });

            expect(onChange).toHaveBeenCalledWith(null);
        });

        it('capitalises change value', () => {
            const roomCode = 'soiree';
            const onChange = jest.fn();
            const { getByTestId } = testRender({
                roomCode,
                onChange,
            });

            fireEvent.change(getByTestId('Test'), { target: { value: 'jokers' } });

            expect(onChange).toHaveBeenCalledWith('JOKERS');
        });
    });
});
