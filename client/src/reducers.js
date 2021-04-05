/**
 * @file reducers
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import {
  reducer as HomeManagement,
  name as nameOfHomeManagement,
} from "./containers/HomeManagement";
import {
    reducer as HeaderManagement,
    name as nameOfHeaderManagement,
} from "./containers/HeaderManagement";
// Place for reducers' app

const reducers = {
    [nameOfHomeManagement]: HomeManagement,
    [nameOfHeaderManagement]: HeaderManagement,
};

export default (history) =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
