import { FormEvent, useCallback, useState } from 'react';
import { useRoomCodeForm } from 'room/hooks/useRoomCodeForm';

const setValue = jest.fn();

jest.mock('react', () => ({
    __esModule: true,
    useState: jest.fn(),
    useCallback: jest.fn(),
}));

beforeEach(() => {
    jest.mocked(useState as any).mockImplementation((roomCode: string) => [roomCode, setValue]);
    jest.mocked(useCallback as any).mockImplementation((callback: () => void) => callback);
});

// TODO test validation

describe('useRoomCodeForm()', () => {
    it('calls setState with initialRoomCode', () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();

        useRoomCodeForm({
            initialRoomCode: 'JOKERS',
            onChange,
            onSubmit,
        });

        expect(jest.mocked(useState)).toHaveBeenCalledWith('JOKERS');
    });

    describe('props.onChange', () => {
        it('is wrapped with useCallback', () => {
            const onChange = jest.fn();
            const onSubmit = jest.fn();

            const result = useRoomCodeForm({
                initialRoomCode: 'initial',
                onChange,
                onSubmit,
            });

            const { onChange: onChangeWrapped } = result;
            expect(onChangeWrapped).not.toBe(onChange);
            expect(jest.mocked(useCallback)).toHaveBeenCalledTimes(2);
        });

        it('wrapped version calls setRoomCode and base', () => {
            const onChange = jest.fn();
            const onSubmit = jest.fn();
            const result = useRoomCodeForm({
                initialRoomCode: 'INIT00',
                onChange,
                onSubmit,
            });

            const { onChange: onChangeWrapped } = result;
            onChangeWrapped('SOIREE');

            expect(setValue).toHaveBeenCalledWith('SOIREE');
            expect(onChange).toHaveBeenCalledWith('SOIREE');
        });
    });

    describe('props.onSubmit', () => {
        it('is wrapped with useCallback', () => {
            const onChange = jest.fn();
            const onSubmit = jest.fn();

            const result = useRoomCodeForm({
                initialRoomCode: 'SOIREE',
                onChange,
                onSubmit,
            });

            const { onSubmit: onSubmitWrapped } = result;
            expect(onSubmitWrapped).not.toBe(onSubmit);
            expect(jest.mocked(useCallback)).toHaveBeenCalledTimes(2);
        });

        it('wrapped version calls event.preventDefault and base', () => {
            const onChange = jest.fn();
            const onSubmit = jest.fn();
            const event = { preventDefault: jest.fn() } as unknown as FormEvent<HTMLFormElement>;
            const result = useRoomCodeForm({
                initialRoomCode: 'SOIREE',
                onChange,
                onSubmit,
            });

            const { onSubmit: onSubmitWrapped } = result;
            onSubmitWrapped(event);

            expect(event.preventDefault).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenCalledWith('SOIREE');
        });
    });
});
