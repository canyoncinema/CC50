import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';

import App from './App';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
