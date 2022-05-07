import {createReducer} from "@reduxjs/toolkit";
import {IUserState, SET_NAME} from "./userTypes";

const initialState: IUserState = {
    name: undefined
}

const userReducer = createReducer(initialState, {
    [SET_NAME]: (state, action) => {
        return {
            ...state,
            name: action.payload
        };
    }
})

export default userReducer;
