import {createReducer} from "@reduxjs/toolkit";
import {IUserState, SET_NAME, START_FLOW, SAVE_FLOW} from "./userTypes";

const initialState: IUserState = {
    name: undefined,
    flow: undefined,
    decisionFlows: []
}

const userReducer = createReducer(initialState, {
    [SET_NAME]: (state, action) => {
        return {
            ...state,
            name: action.payload
        };
    },
    [START_FLOW]: (state, action) => {
        return {
            ...state,
            flow: {
                name: action.payload,
                properties: [],
                options: []
            }
        };
    },
    [SAVE_FLOW]: (state, action) => {
        return {
            ...state,
            flow: action.payload
        };
    },
})

export default userReducer;
