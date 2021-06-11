
import freeze from "deep-freeze";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
export const name = "Home";
const initialState = freeze({
    userList: [],
    isLoading: false,
    isError: false
})

export default handleActions(
    {
        /**
     * get list table by area with table empty
     */
        // [actions.getUserList]: (state, action) => {
        //     return freeze({
        //         ...state,
        //         isLoading: true
        //     })
        // },
        // [actions.getUserListSuccess]: (state, action) => {
        //     return freeze({
        //         ...state,
        //         userList: action.payload.data,
        //         isLoading: false
        //     })
        // },
        // [actions.getUserListFail]: (state, action) => {
        //     return freeze({
        //         ...state,
        //         isError: true
        //     })
        // },

    },
    initialState
)