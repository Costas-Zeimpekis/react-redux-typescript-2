import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import Reducers from './container/Store/Reducers';
import { Provider } from 'react-redux';

const initialState = {};

const store = createStore(Reducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
