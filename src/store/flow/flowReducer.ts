import {createReducer} from "@reduxjs/toolkit";
import {START_FLOW, SAVE_FLOW, RESET_FLOW, IFlowState} from "./flowTypes";
import {PURGE} from "redux-persist";

const initialState: IFlowState = {
    current: undefined,
    saved: []
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
            saved: {
                ...state.saved,
                ...action.payload
            }
        };
    },
    [RESET_FLOW]: (state) => {
        return {
            ...state,
            current: undefined
        }
    },
    [PURGE]: () => initialState
})

export default flowReducer;
