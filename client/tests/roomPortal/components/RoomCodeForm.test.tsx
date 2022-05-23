import type { HookProps } from 'common/model/HookFunction';
import type { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { RoomCodeForm } from 'roomPortal/components/RoomCodeForm';
import { RoomCodeInput } from 'roomPortal/components/RoomCodeInput';
import Button from '@mui/material/Button';
import { useRoomCodeForm } from 'roomPortal/hooks/useRoomCodeForm';

jest.mock('roomPortal/components/RoomCodeInput', () => ({
    __esModule: true,
    RoomCodeInput: (props: ComponentProps<typeof RoomCodeInput>) => (
        <div
            data-testid="Test-RoomCodeInput"
            data-room-code={props.roomCode}
            data-on-change={props.onChange.toString()}
        />
    ),
}));

jest.mock('@mui/material/Button', () => ({
    __esModule: true,
    default: (props: ComponentProps<typeof Button>) => (
        <button
            type='submit'
            data-testid="Test-SubmitButton"
        >
            {props.children}
        </button>
    ),
}));

jest.mock('roomPortal/hooks/useRoomCodeForm', () => ({
    __esModule: true,
    useRoomCodeForm: (props: HookProps<typeof useRoomCodeForm>) => ({
        roomCode: props.initialRoomCode,
        isValid: true,
        setRoomCode: props.onChange,
        onSubmit: props.onSubmit,
    }),
}));

function testRender(props: ComponentProps<typeof RoomCodeForm>) {
    return render(<RoomCodeForm {...props} />);
}

describe('<RoomCodeForm />', () => {
    it('renders <RoomCodeInput /> with roomCode and submit button', () => {
        const initialRoomCode = 'soiree';
        const submitText = 'GO';
        const onChange = jest.fn();
        const onSubmit = jest.fn(e => e.preventDefault());

        const { getByTestId } = testRender({
            initialRoomCode,
            submitText,
            onChange,
            onSubmit,
        });

        const roomCodeInput = getByTestId('Test-RoomCodeInput');
        expect(roomCodeInput).toHaveAttribute('data-room-code', initialRoomCode);
        expect(roomCodeInput).toHaveAttribute('data-on-change', onChange.toString());

        const submitButton = getByTestId('Test-SubmitButton');
        expect(submitButton).toHaveTextContent('GO');
    });

    describe('props.onSubmit', () => {
        it('is called on submit button click', () => {
            const initialRoomCode = 'soiree';
            const submitText = 'GO';
            const onChange = jest.fn();
            const onSubmit = jest.fn(e => e.preventDefault());
            const { getByTestId } = testRender({
                initialRoomCode,
                submitText,
                onChange,
                onSubmit,
            });

            fireEvent.click(getByTestId('Test-SubmitButton'));

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
