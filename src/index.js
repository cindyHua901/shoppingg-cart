import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
, document.getElementById('root'));

//另一个状态管理相关的东西 redux
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
