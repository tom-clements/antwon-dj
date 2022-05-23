import { createStore, State, Store } from 'common/services/createStore';
import { useMemo } from 'react';
import createCache from '@emotion/cache';

let store: Store | undefined;

export const initializeStore = (preloadedState: State) => {
    let _store = store ?? createStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = createStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;

    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useAppStore(initialState: State) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export function createEmotionCache() {
    return createCache({ key: 'css' });
}
