import { call, put, takeEvery } from "redux-saga/effects";
import * as apiUser from "../../../api/user";
import * as actions from "../actions";
import Swal from 'sweetalert2';
import { get, save } from './../../../services/localStorage';
import common from "../../../utils/common";

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
        var infoUser = common.decodeToken(res.data.accessToken);
        console.log("user saga", infoUser, infoUser?.data?._id)
        yield put(actions.getUserById({ id: infoUser?.data?._id}));
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
function* handleGetUserById(action) {
    try {
        const res = yield call(apiUser.getUserById, action.payload);
        console.log("res saga by id", res.data)
        yield put(actions.getUserByIdSuccess(res.data));
    } catch (error) {
        console.log("err saga", error);
        yield put(actions.getUserByIdFail(error));
    }
}
function* handleUpdateInfoUser(action) {
    try {
        const res = yield call(apiUser.updateInfoUser, action.payload);
        console.log("res saga by id update user", res.data)
        yield Swal.fire(
            'Thông báo',
            'Cập nhật hình ảnh chữ ký thành công!',
            'success'
        )
        yield put(actions.updateInfoUserSuccess(res.data));
    } catch (error) {
        yield Swal.fire(
            'Thông báo',
            'Cập nhật hình ảnh chữ ký thất bại!',
            'error'
        )
        console.log("err saga update", error);
        yield put(actions.updateInfoUserSuccess(error));
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

export default [
    getUserList,
    signIn,
    signUp,
    getUserById,
    updateInfoUser
];
