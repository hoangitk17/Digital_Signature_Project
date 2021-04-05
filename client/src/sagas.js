import { all } from "redux-saga/effects";
//////////////////////////////////////////////
import { sagas as homeManagement } from "./containers/HomeManagement";
import { sagas as headerManagement } from "./containers/HeaderManagement";
// Place for sagas' app

const sagasList = [
  homeManagement(),
  headerManagement()
];

export default function* () {
  yield all(sagasList);
}
