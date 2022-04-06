// import Amplify from 'aws-amplify';
// import awsExports from "aws-exports";
import { createStore, RootState, Store } from 'model/Store';
import { useMemo } from 'react';
import { connectAmplifyToStore } from 'model/Amplify';
import createCache from '@emotion/cache';

let store: Store | undefined;

function setupAmplify() {
    // Amplify.configure({ ...awsExports, ssr: true });
}

export function setupApp() {
    setupAmplify();
}

export const initializeStore = (preloadedState: RootState) => {
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

    connectAmplifyToStore(_store);

    return _store;
};

export function useAppStore(initialState: RootState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export function createEmotionCache() {
    return createCache({ key: 'css' });
}
