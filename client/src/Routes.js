import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';


class Router extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
              return <>
                  <Button type="primary">Primary Button</Button>
                  <Button>Default Button</Button>
                  <Button type="dashed">Dashed Button</Button>
                  <br />
                  <Button type="text">Text Button</Button>
                  <Button type="link">Link Button</Button>
              </>;

          }}
        />
      </Switch>
    );
  }

}

export default Router;
