import { useEffect } from 'react';
import type { HF } from 'common/model/HookFunction';
import { Fault, FaultType } from 'common/model/Fault';

export type UseFaultLogging = HF<Fault | undefined, void>;

export const useFaultLogging: UseFaultLogging = fault => {
    useEffect(() => {
        if (!fault) return;
        const message = `[${FaultType[fault.type]}] ${fault.message}`;
        console.error(message);
    }, [fault]);
};
