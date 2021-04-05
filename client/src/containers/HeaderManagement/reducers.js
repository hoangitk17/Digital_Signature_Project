
import freeze from "deep-freeze";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
export const name = "Header";
const initialState = freeze({
    userList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    InfoAfterSignIn: {},
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
            return freeze({
                ...state,
                InfoAfterSignIn: action.payload.result,
                isLoading: false,
                isLogin: true
            })
        },
        [actions.signInFail]: (state, action) => {
            return freeze({
                ...state,
                isError: true,
                errorMessage: action.payload
            })
        },

    },
    initialState
)