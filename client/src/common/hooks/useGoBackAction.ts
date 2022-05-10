import { useMemo } from 'react';

type GoBackAction = () => void;

export type UseGoBackAction = () => GoBackAction;

export const useGoBackAction: UseGoBackAction = () => {
    return useMemo(() => (
        () => undefined
    ), []);
};
