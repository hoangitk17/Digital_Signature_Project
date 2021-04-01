import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <h1>abc</h1>;
          }}
        />
      </Switch>
    );
  }

}

export default Router;
