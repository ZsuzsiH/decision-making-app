import {createReducer} from "@reduxjs/toolkit";
import {IUserState, SET_NAME, START_FLOW, SAVE_FLOW, SAVE_PROPERTY} from "./userTypes";

const initialState: IUserState = {
    name: undefined,
    newFlow: undefined,
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
            newFlow: {
                name: action.payload,
                properties: []
            }
        };
    },
    [SAVE_PROPERTY]: (state, action) => {
        return {
            ...state,
            newFlow: {
                name: action.payload.name,
                properties: action.payload.properties
            }
        };
    },
    [SAVE_FLOW]: (state, action) => {
        return {
            ...state,
            decisionFlows: state.decisionFlows.concat(action.payload)
        };
    },
})

export default userReducer;
