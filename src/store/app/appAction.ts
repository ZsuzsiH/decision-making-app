import {AppDispatch} from "../store";
import {SET_STEP} from "./appTypes";

export const setStep = (step: number) => (dispatch: AppDispatch): void => {
    dispatch({
        type: SET_STEP,
        payload: step
    })
};