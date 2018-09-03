import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoute from './AppRoute';
import createStore from './Redux'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter><AppRoute /></HashRouter>
    </PersistGate>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
