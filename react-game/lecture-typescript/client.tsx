import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
// import App from './App';

// import GuGuDan from "./GuGuDan";
// import ResponseCheck from "./ResponseCheck";
// import HOT from "./RSP";
// import HOT from "./TicTacToe";
// import HOT from "./MineSearch";
// const Hot = hot(App);
import Games from "./Games";
// const Hot = hot(Games);
ReactDOM.render(<Games/>, document.querySelector("#root"));