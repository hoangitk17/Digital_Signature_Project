/**
 * @file reducers
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Place for reducers' app

const reducers = {
  
};

export default (history) =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
