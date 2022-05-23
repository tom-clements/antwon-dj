import type { HF } from 'common/model/HookFunction';
import { FormEvent, useCallback, useState } from 'react';

// TODO extract out as validation rule
function isValidRoomCode(roomCode: string | null): roomCode is string {
    if (!roomCode) return false;
    return roomCode.length === 6;
}

interface Props {
    initialRoomCode: string | null,
    onChange?: (roomCode: string | null) => void, // TODO remove this option
    onSubmit: (roomCode: string) => void
}

interface Return {
    roomCode: string | null,
    isValid: boolean,
    setRoomCode: (roomCode: string | null) => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export type UseRoomCodeForm = HF<Props, Return>;

export const useRoomCodeForm: UseRoomCodeForm = props => {
    const { onChange, onSubmit } = props;
    const [roomCode, setRoomCode] = useState<string | null>(props.initialRoomCode);
    const isValid = isValidRoomCode(roomCode);

    return {
        roomCode,
        isValid,
        setRoomCode: useCallback(
            (roomCode: string | null) => {
                setRoomCode(roomCode);
                onChange && onChange(roomCode);
            },
            [onChange]),
        onSubmit: useCallback(
            (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                if (isValid) onSubmit(roomCode);
            },
            [onSubmit, isValid, roomCode])
    };
};
