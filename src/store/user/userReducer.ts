import {createReducer} from "@reduxjs/toolkit";
import {UserState, SET_NAME} from "./userTypes";
import {PURGE} from "redux-persist";

const initialState: UserState = {
    name: undefined
}

const userReducer = createReducer(initialState, {
    [SET_NAME]: (state, action) => {
        return {
            ...state,
            name: action.payload
        };
    },
    [PURGE]: () => initialState
})

export default userReducer;
