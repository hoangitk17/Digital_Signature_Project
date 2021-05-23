import { call, put, takeEvery } from "redux-saga/effects";
import * as apiUser from "../../../api/user";
import * as actions from "../actions";
import Swal from 'sweetalert2';
import { get, save } from './../../../services/localStorage';
import common from "../../../utils/common";
import nodeForge from "../../../utils/nodeforge";
import forge from 'node-forge';

function* handleGetUserList(action) {
    try {
        const res = yield call(apiUser.getUserList, action.payload);
        yield put(actions.getUserListSuccess(res.data));
    } catch (error) {
        yield put(actions.getUserListFail(error));
    }
}
function* handleSignIn(action) {
    let res = null;
    try {
      const resPub = yield call(apiUser.getPublicKeyServer, action.payload);
      const aesKey = nodeForge.generateAESKey();
      const aesKeyPem = yield forge.util.encode64(JSON.stringify(aesKey));
      const publicKeyPemServer = resPub.data.publicKey;
      yield save("aesKeyPem", forge.util.decode64(aesKeyPem));
      let dataLogin = { ...action.payload.data };
      if (aesKey && publicKeyPemServer) {
        dataLogin = { ...dataLogin, key: nodeForge.encryptRSA(aesKeyPem, publicKeyPemServer)}
      }
        res = yield call(apiUser.signIn, {data: dataLogin});
        yield save("accessToken", res.data.accessToken);
        yield save("refreshToken", res.data.refreshToken);
        yield save("isLogin", true);
        var infoUser = common.decodeToken(res.data.accessToken);
        yield put(actions.getUserById({ id: infoUser?.data?._id}));
        yield put(actions.signInSuccess(res.data));
        yield Swal.fire(
            'Thông báo',
            'Đăng nhập thành công!',
            'success'
        )
        yield action.payload.closeModal();
    } catch (error) {
        yield put(actions.signInFail(error?.data?.message || "Tài khoản hoặc mật khẩu không đúng!"));

        yield Swal.fire(
            'Thông báo',
            'Đăng nhập thất bại!',
            'error'
        )
        /*  else {
            yield put(actions.signInFail("Network error"));
        } */
    }
}
function* handleSignUp(action) {
    let res = null;
    try {
        res = yield call(apiUser.signUp, action.payload);
        yield put(actions.signUpSuccess(res.data));
        yield Swal.fire(
            'Thông báo',
            'Đăng ký tài khoản thành công!',
            'success'
        )
        yield action.payload.closeModal();
    } catch (error) {

        yield put(actions.signUpFail(error?.data?.message || ""));

        yield Swal.fire(
            'Thông báo',
            'Đăng ký tài khoản thất bại!',
            'error'
        )
        /*  else {
            yield put(actions.signInFail("Network error"));
        } */
    }
}
function* handleGetUserById(action) {
    try {
        const res = yield call(apiUser.getUserById, action.payload);
        yield put(actions.getUserByIdSuccess(res.data));
    } catch (error) {
        yield put(actions.getUserByIdFail(error));
    }
}

function* handleUpdateInfoUser(action) {
    try {
        const res = yield call(apiUser.updateInfoUser, action.payload);
        yield put(actions.updateInfoUserSuccess(res.data));
        yield put(actions.getUserById({ id: res?.data?._id }));
        yield Swal.fire(
            'Thông báo',
            'Cập nhật thành công!',
            'success'
        )
        yield action.payload.closeModal();
    } catch (error) {
      yield put(actions.updateInfoUserFail(error));
        yield Swal.fire(
            'Thông báo',
            'Cập nhật thất bại!',
            'error'
        )
    }
}

function* handleGetUserInfoByPublicKey(action) {
  try {
    if (JSON.stringify(action.payload) === '{}') {
      yield put(actions.getUserInfoByPublicKeySuccess({}));
      return;
    }
      const res = yield call(apiUser.getUserInfoByPublicKey, action.payload);
    yield put(actions.getUserInfoByPublicKeySuccess(res.data));
    yield Swal.fire(
      'Thông báo',
      'Tệp văn bản này đã được kí!',
      'info'
    )
  } catch (error) {
    yield put(actions.getUserInfoByPublicKeyFail(error));
      yield Swal.fire(
          'Thông báo',
          'Lấy thông tin người ký thất bại!',
          'error'
      )
  }
}


function* getUserList() {
    yield takeEvery(actions.getUserList, handleGetUserList);
}
function* getUserById() {
    yield takeEvery(actions.getUserById, handleGetUserById);
}
function* signIn() {
    yield takeEvery(actions.signIn, handleSignIn);
}
function* signUp() {
    yield takeEvery(actions.signUp, handleSignUp);
}
function* updateInfoUser() {
    yield takeEvery(actions.updateInfoUser, handleUpdateInfoUser);
}

function* getUserInfoByPublicKey() {
  yield takeEvery(actions.getUserInfoByPublicKey, handleGetUserInfoByPublicKey);
}

export default [
    getUserList,
    signIn,
    signUp,
    getUserById,
    updateInfoUser,
    getUserInfoByPublicKey,
];
