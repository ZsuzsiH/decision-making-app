import { AppDispatch } from "../store";
import {SET_NAME, START_FLOW, SAVE_FLOW, INewFlow} from "./userTypes";

export const setUserName = (name: string) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SET_NAME,
        payload: name
    })
};

export const startDecisionFlow = (name: string) => (dispatch: AppDispatch): void => {
    dispatch({
        type: START_FLOW,
        payload: name
    })
}

export const saveDecisionFlow = (flow: INewFlow) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SAVE_FLOW,
        payload: flow
    })
}