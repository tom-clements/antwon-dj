import type { FC } from 'react';
import { Provider } from 'react-redux';
import { createPersistedStore } from 'common/services/createStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = createPersistedStore();
const persistor = persistStore(store);

export const { purge, flush } = persistor;

export const StateProvider: FC = props => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    );
};
