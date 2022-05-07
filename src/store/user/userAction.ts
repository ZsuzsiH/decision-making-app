import { AppDispatch } from "../store";
import {SET_NAME, START_FLOW, SAVE_FLOW, IProperty, SAVE_PROPERTY} from "./userTypes";

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

export const saveProperty = (flowName: string, property: IProperty) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SAVE_PROPERTY,
        payload: {
            name: flowName,
            property
        }
    })
}

export const saveDecisionFlow = (flow: any) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SAVE_FLOW,
        payload: flow
    })
}