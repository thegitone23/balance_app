import React from 'react';
import ReactDOM from 'react-dom';

import thunk from "redux-thunk";
import { Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./rootReducer";


import "./firebase";

import "./static/bootstrap.css"
import "./static/style.css"

import Navbar from "./Nav";
import Home from "./Home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Contacts from "./Contacts";

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <div className="container text-center">
      <Navbar />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/contacts" component={Contacts} exact/>
        <Route path="/user/:id" component={Home} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

