import {AppDispatch} from "../store";
import {START_FLOW, SAVE_FLOW, CurrentFlow} from "./flowTypes";

export const startDecisionFlow = (name: string) => (dispatch: AppDispatch): void => {
    dispatch({
        type: START_FLOW,
        payload: name
    })
}

export const saveDecisionFlow = (flow: Partial<CurrentFlow>) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SAVE_FLOW,
        payload: flow
    })
}