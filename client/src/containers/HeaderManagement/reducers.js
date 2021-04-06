
import freeze from "deep-freeze";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
import { save } from "../../services/localStorage";
export const name = "Header";
const initialState = freeze({
    userList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    errorMessageSignUp: "",
    InfoAfterSignIn: {},
    InfoAfterSignUp: {},
    isLogin: false
})

export default handleActions(
    {
        /**
     * get list table by area with table empty
     */
        [actions.getUserList]: (state, action) => {
            return freeze({
                ...state,
                isLoading: true
            })
        },
        [actions.getUserListSuccess]: (state, action) => {
            return freeze({
                ...state,
                userList: action.payload.data,
                isLoading: false
            })
        },
        [actions.getUserListFail]: (state, action) => {
            return freeze({
                ...state,
                isError: true
            })
        },
        [actions.signIn]: (state, action) => {
            return freeze({
                ...state,
                isLoading: true
            })
        },
        [actions.signInSuccess]: (state, action) => {
            console.log("info", action.payload.result, action.payload)
            save("isLogin", true);
            save("name-user", action?.payload?.result?.name)
            return freeze({
                ...state,
                InfoAfterSignIn: action.payload.result,
                isLoading: false,
                isLogin: true
            })
        },
        [actions.signInFail]: (state, action) => {
            console.log("Fail")
            save("isLogin", false);
            return freeze({
                ...state,
                isError: true,
                isLogin: false,
                errorMessage: action?.payload ? action?.payload : null
            })
        },
        [actions.signUp]: (state, action) => {
            return freeze({
                ...state,
                isLoading: true
            })
        },
        [actions.signUpSuccess]: (state, action) => {
            console.log("info", action.payload.result, action.payload)
            return freeze({
                ...state,
                infoAfterSignUp: action.payload.result,
                isLoading: false,
            })
        },
        [actions.signUpFail]: (state, action) => {
            console.log("reducer", action.payload)
            return freeze({
                ...state,
                errorMessageSignUp: action.payload,
            })
        },

    },
    initialState
)