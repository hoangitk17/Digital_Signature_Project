import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import Routes from "./Routes";
import configureStore from "./stores";

const browserHistory = createBrowserHistory();
export const { store, history } = configureStore();
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes history={browserHistory} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
