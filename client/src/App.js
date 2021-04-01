import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "./styles/index.scss";
import Routes from "./Routes";
import configureStore from "./stores";
import 'antd/dist/antd.css';

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
