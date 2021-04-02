/**
 * @file reducers
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import {
  reducer as HomeManagement,
  name as nameOfHomeManagement,
} from "./containers/HomeManagement";
// Place for reducers' app

const reducers = {
  [nameOfHomeManagement]: HomeManagement,
};

export default (history) =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
