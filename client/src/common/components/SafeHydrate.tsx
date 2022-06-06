import { FC } from 'react';

/**
 * Forces all children to be rendered client-side only in Next.js
 * Useful for removing SSR from development mode et al. when targeting
 * client-only static content.
 */
export const SafeHydrate: FC = props => {
    return (
        <div suppressHydrationWarning>
            {
                typeof window === 'undefined'
                    ? null
                    : props.children}
        </div>
    );
};
