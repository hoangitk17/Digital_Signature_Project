import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';
import Footer from "./components/Footer";
import {
  HomeManagement,
  HeaderManagement
} from "./containers";
class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact >
          <>
            <HeaderManagement />
            <HomeManagement />
            <Footer />
          </>
        </Route>
      </Switch>
    );
  }

}

export default Router;
