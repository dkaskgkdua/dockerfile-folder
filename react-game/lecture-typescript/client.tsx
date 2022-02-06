import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import store from './store'
import { Provider} from 'react-redux';

// import GuGuDan from "./GuGuDan";
// import ResponseCheck from "./ResponseCheck";
// import HOT from "./RSP";
// import HOT from "./TicTacToe";
// import HOT from "./MineSearch";
const Hot = hot(App);
// import Games from "./Games";
// const Hot = hot(Games);
ReactDOM.render(
    <Provider store={store}>
        <Hot/>
    </Provider>

    , document.querySelector("#root")
);