import { useDependencies } from 'common/hooks/useDependencies';
import { FC } from 'react';

export const Breadcrumb: FC = props => {
    useDependencies(d => d.useBreadcrumbs)();
    return (
        <>{props.children}</>
    );
};
