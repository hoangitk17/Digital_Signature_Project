
import freeze from "deep-freeze";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
export const name = "Home";
const initialState = freeze({
    comboList: [],
    isLoading: false,
    isError: false,
    itemList: [],
    comboItemDetail: {},
    countPage: 0,
    countPageItem: 0,
    itemComboList: [],
    dishIconList: []
})

export default handleActions(
    {
        // [actions.getComboList]: (state, action) => {
        //     return freeze({
        //         ...state,
        //         isLoading: true
        //     })
        // },
        
    },
    initialState
)