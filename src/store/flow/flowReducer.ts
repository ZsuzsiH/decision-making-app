import {createReducer} from "@reduxjs/toolkit";
import {START_FLOW, SAVE_FLOW, RESET_FLOW, FlowState} from "./flowTypes";
import {PURGE} from "redux-persist";

const initialState: FlowState = {
    current: undefined
}

const flowReducer = createReducer(initialState, {
    [START_FLOW]: (state, action) => {
        return {
            ...state,
            current: {
                name: action.payload,
                properties: [],
                options: []
            }
        };
    },
    [SAVE_FLOW]: (state, action) => {
        return {
            ...state,
            current: {
                ...state.current,
                ...action.payload
            }
        };
    },
    [RESET_FLOW]: () => initialState,
    [PURGE]: () => initialState
})

export default flowReducer;
