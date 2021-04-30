
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
    userInfoSigned: {},
    isLogin: false,
    infoUserUpdate: {}
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
            console.log("users reducer", action.payload.data, action.payload)
            return freeze({
                ...state,
                userList: action.payload,
                isLoading: false
            })
        },
        [actions.getUserListFail]: (state, action) => {
            return freeze({
                ...state,
                isError: true,
                isLoading: false
            })
        },
        [actions.getUserById]: (state, action) => {
            return freeze({
                ...state,
                isLoading: true
            })
        },
        [actions.getUserByIdSuccess]: (state, action) => {
            console.log("user by id reducer", action.payload.data, action.payload)
            return freeze({
                ...state,
                InfoAfterSignIn: action.payload,
                isLoading: false
            })
        },
        [actions.getUserByIdFail]: (state, action) => {
            return freeze({
                ...state,
                isError: true,
                isLoading: false
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
                errorMessage: action?.payload ? action?.payload : null,
                isLoading: false
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
                isLoading: false
            })
        },
        [actions.updateInfoUser]: (state, action) => {
            return freeze({
                ...state,
                isLoading: true
            })
        },
        [actions.updateInfoUserSuccess]: (state, action) => {
            console.log("info update user", action.payload.result, action.payload)
            if(action.payload && action.payload.name )
            {
                save("name-user", action.payload.name)
            }
            return freeze({
                ...state,
                isLoading: false,
                infoUserUpdate: action.payload
            })
        },
        [actions.updateInfoUserFail]: (state, action) => {
            console.log("info update user err", action.payload)
            return freeze({
                ...state,
                isLoading: false,
            })
        },

        [actions.getUserInfoByPublicKey]: (state, action) => {
          return freeze({
              ...state,
              isLoading: true
          })
      },
      [actions.getUserInfoByPublicKeySuccess]: (state, action) => {
        console.log("info by public key", action.payload.result, action.payload)
          return freeze({
              ...state,
              isLoading: false,
              userInfoSigned: {...action.payload},
          })
      },
      [actions.getUserInfoByPublicKeyFail]: (state, action) => {

          return freeze({
              ...state,
              isLoading: false,
          })
      },

    },
    initialState
)