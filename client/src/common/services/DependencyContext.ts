import { createContext } from 'react';
import { dependencies } from 'dependencies';

export type Dependencies = typeof dependencies;

export const DependencyContext = createContext(dependencies);
