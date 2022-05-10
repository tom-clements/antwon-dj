import { FC, ReactElement, ReactNode } from 'react';

export type AnyChildProps = { children?: ReactNode | null };

export type ElementChildProps = { children: ReactElement };

export type FunctionElementComponent<P extends ElementChildProps = { children: ReactElement }> = FC<P>;
export type FEC<P extends ElementChildProps = { children: ReactElement }> = FunctionElementComponent<P>;
