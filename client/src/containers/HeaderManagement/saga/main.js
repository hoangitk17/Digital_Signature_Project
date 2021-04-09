import { call, put, takeEvery } from "redux-saga/effects";
import * as apiUser from "../../../api/user";
import * as actions from "../actions";
import Swal from 'sweetalert2';
import { get, save } from './../../../services/localStorage';

function* handleGetUserList(action) {
  try {
    const res = yield call(apiUser.getUserList, action.payload);
    console.log("res saga", res.data)
    yield put(actions.getUserListSuccess(res.data));
  } catch (error) {
    console.log("err saga", error);
    yield put(actions.getUserListFail(error));
  }
}
function* handleSignIn(action) {
  let res = null;
  try {
    console.log("run saga")
    res = yield call(apiUser.signIn, action.payload);
    console.log(res);
    yield save("accessToken", res.data.accessToken);
    yield save("refreshToken", res.data.refreshToken);
    /* console.log("id user", res.data.data, res.data.data.id)
    const resUserById = yield call(apiUser.getUserListById, {id: res.data.data.id});
    console.log("res saga login", res.data, resUserById) */
    yield put(actions.signInSuccess(res.data));
    yield Swal.fire(
      'Thông báo',
      'Đăng nhập thành công!',
      'success'
    )
    yield action.payload.closeModal();
  } catch (error) {
    yield Swal.fire(
      'Thông báo',
      'Đăng nhập thất bại!',
      'error'
    )
    console.log("err saga login", error);
    if (error?.data?.message) {
      yield put(actions.signInFail(error?.data?.message));
    }/*  else {
            yield put(actions.signInFail("Network error"));
        } */
  }
}
function* handleSignUp(action) {
  let res = null;
  try {
    console.log("run saga")
    res = yield call(apiUser.signUp, action.payload);
    console.log("res saga login", res.data)
    yield put(actions.signUpSuccess(res.data));
    yield Swal.fire(
      'Thông báo',
      'Đăng ký tài khoản thành công!',
      'success'
    )
    yield action.payload.closeModal();
  } catch (error) {
    yield Swal.fire(
      'Thông báo',
      'Đăng ký tài khoản thất bại!',
      'error'
    )
    console.log("err saga login", error);
    if (error?.data?.message) {
      yield put(actions.signUpFail(error?.data?.message));
    }/*  else {
            yield put(actions.signInFail("Network error"));
        } */
  }
}

function* getUserList() {
  yield takeEvery(actions.getUserList, handleGetUserList);
}
function* signIn() {
  yield takeEvery(actions.signIn, handleSignIn);
}
function* signUp() {
  yield takeEvery(actions.signUp, handleSignUp);
}

export default [
  getUserList,
  signIn,
  signUp
];
