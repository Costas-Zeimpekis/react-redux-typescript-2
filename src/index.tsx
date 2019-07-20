import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, compose, applyMiddleware } from 'redux';
import Reducers from './container/store/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(Reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export default store;
