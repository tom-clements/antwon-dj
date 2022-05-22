import type { FC } from 'react';
import { DependencyContext, Dependencies } from 'common/services/DependencyContext';
import { dependencies } from 'dependencies';

/**
 * Map of dependencies. This overrides any default defined in the `DependencyContext`
 * module. This is particularly useful whilst mocking and testing.
 */
type Props = Partial<Dependencies>;

export const DependencyProvider: FC<Props> = props => {
    const { children, ...otherProps } = props;
    const resolvedDependencies = {
        ...dependencies,
        ...otherProps,
    };

    return (
        <DependencyContext.Provider value={resolvedDependencies}>
            {children}
        </DependencyContext.Provider>
    );
};
