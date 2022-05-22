import { useContext, useMemo } from 'react';
import { Dependencies, DependencyContext } from 'common/services/DependencyContext';

type DependencySelector<T> = (dependencies: Dependencies) => T;

// TODO finish migration of injected hooks to this API.
export const useDependencies = <T>(selector: DependencySelector<T>) => {
    const dependencies = useContext(DependencyContext);
    return useMemo(() => selector(dependencies), [dependencies, selector]);
};
