import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  HomeManagement
} from "./containers";
class Router extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact

        >
          <><Header></Header><HomeManagement></HomeManagement><Footer></Footer></>
        </Route>
      </Switch>
    );
  }

}

export default Router;
