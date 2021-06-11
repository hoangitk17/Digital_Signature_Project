// import { call, put, takeEvery } from "redux-saga/effects";
// import * as apiUser from "./../../../api/user";
// import * as actions from "../actions";



// function* handleGetComboList(action) {
//     try {
//         const res = yield call(apiCombo.getComboList, action.payload);
//         const page = action.payload.page
//         yield put(actions.getComboListSuccess({ data: res.data, page }));
//     } catch (error) {
//         yield put(actions.getComboListFail(error.response));
//     }
// }

// function* handleGetUserList(action) {
//     try {
//         const res = yield call(apiUser.getUserList, action.payload);
//         yield put(actions.getUserListSuccess(res.data));
//     } catch(error) {
//         yield put(actions.getUserListFail(error));
//     }
// }




// function* loadDishIcon() {
//     yield takeEvery(actions.loadDishIcon, handleLoadDishIcon);
// }

// function* getUserList() {
//     yield takeEvery(actions.getUserList, handleGetUserList);
// }
// export default [
//     getUserList
// ];
