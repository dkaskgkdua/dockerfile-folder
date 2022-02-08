import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
const Hot = hot(App);
import { StoreProvider } from "./Context";

ReactDOM.render(
    <StoreProvider>
        <Hot/>
    </StoreProvider>

    , document.querySelector("#root")
);