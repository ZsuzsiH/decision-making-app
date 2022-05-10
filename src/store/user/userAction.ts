import { AppDispatch } from "../store";
import {SET_NAME} from "./userTypes";

export const setUserName = (name: string) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SET_NAME,
        payload: name
    })
};