import type { CSSProperties, FC, ReactElement, ReactNode } from 'react';

export interface AnyChildProps {
    children?: ReactNode | null
}

export interface ElementChildProps {
    children: ReactElement
}

export type FunctionElementComponent<P extends ElementChildProps = { children: ReactElement }> = FC<P>;
export type FEC<P extends ElementChildProps = { children: ReactElement }> = FunctionElementComponent<P>;

export interface StyleProps {
    className?: string;
    style?: CSSProperties;
}
