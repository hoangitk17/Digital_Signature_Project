import { createAction } from "redux-actions";
import * as CONST from "./constants";

// export const getComboList = createAction(CONST.GETCOMBO);
// export const getComboListSuccess = createAction(CONST.GETCOMBO_SUCCESS);
// export const getComboListFail = createAction(CONST.GETCOMBO_FAIL);

export const getUserList = createAction(CONST.GETUSERLIST);
export const getUserListSuccess = createAction(CONST.GETUSERLIST_SUCCESS);
export const getUserListFail = createAction(CONST.GETUSERLIST_FAIL);

export const signIn = createAction(CONST.SIGNIN);
export const signInSuccess = createAction(CONST.SIGNIN_SUCCESS);
export const signInFail = createAction(CONST.SIGNIN_FAIL);

export const signUp = createAction(CONST.SIGNUP);
export const signUpSuccess = createAction(CONST.SIGNUP_SUCCESS);
export const signUpFail = createAction(CONST.SIGNUP_FAIL);


