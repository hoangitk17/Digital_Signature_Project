import { all } from "redux-saga/effects";
//////////////////////////////////////////////
import { sagas as homeManagement } from "./containers/HomeManagement";
// Place for sagas' app

const sagasList = [
  homeManagement(),
];

export default function* () {
  yield all(sagasList);
}
