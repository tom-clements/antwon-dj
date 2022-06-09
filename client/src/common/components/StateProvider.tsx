import { createStore } from 'common/services/createStore';
import type { FC } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

interface Props {
    persist?: boolean;
}

const store = createStore();
const persistor = persistStore(store);

export const { purge } = persistor;

export const StateProvider: FC<Props> = props => {
    if (!props.persist) {
        return (
            <Provider store={store}>
                {props.children}
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    );
};
