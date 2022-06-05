import { useEffect } from 'react';
import type { HF } from 'common/model/HookFunction';
import { Fault } from 'common/model/Fault';
import { logFault } from 'common/services/logging';

export type UseFaultLogging = HF<Fault | undefined, void>;

export const useFaultLogging: UseFaultLogging = fault => {
    useEffect(() => {
        if (!fault) return;
        logFault(fault);
    }, [fault]);
};
