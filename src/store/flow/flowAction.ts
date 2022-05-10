import { AppDispatch } from "../store";
import {START_FLOW, SAVE_FLOW, ICurrentFlow} from "./flowTypes";

export const startDecisionFlow = (name: string) => (dispatch: AppDispatch): void => {
    dispatch({
        type: START_FLOW,
        payload: name
    })
}

export const saveDecisionFlow = (flow: Partial<ICurrentFlow>) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SAVE_FLOW,
        payload: flow
    })
}