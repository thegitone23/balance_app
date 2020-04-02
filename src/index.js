import React from 'react';
import ReactDOM from 'react-dom';

import thunk from "redux-thunk";
import { Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./rootReducer";


import "./firebase";

import "./static/bootstrap.css"
import "./static/style.css"

import Navbar from "./Nav/index";

const store = createStore(reducer);
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Navbar />
  </Provider>,
  document.getElementById('root')
);

