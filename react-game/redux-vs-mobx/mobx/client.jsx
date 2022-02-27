import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppHook from './AppHook';
import StoreProvider from './Context';

ReactDOM.render(
    <StoreProvider>
        <AppHook />
    </StoreProvider>,
    document.querySelector('#root'),
);