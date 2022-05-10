import {createReducer} from "@reduxjs/toolkit";
import {IAppState, SET_STEP} from "./appTypes";
import {PURGE} from "redux-persist";

const initialState: IAppState = {
    step: 0
}

const appReducer = createReducer(initialState, {
    [SET_STEP]: (state, action) => {
        return {
            ...state,
            step: action.payload
        };
    },
    [PURGE]: () => initialState
})

export default appReducer;