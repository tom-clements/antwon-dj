import { FC, ReactElement } from 'react';

export type ElementChildProps = { children: ReactElement };

export type FunctionElementComponent<P extends ElementChildProps = { children: ReactElement }> = FC<P>;
export type FEC<P extends ElementChildProps = { children: ReactElement }> = FunctionElementComponent<P>;
