import type { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'common/services/createStore';

const store = createStore();

export const StateProvider: FC = props => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};
