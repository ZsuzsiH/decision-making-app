export const SET_NAME = "SET_NAME";
export const START_FLOW = "START_FLOW";
export const SAVE_FLOW = "SAVE_FLOW";

export interface IUserState {
    name?: string;
    flow?: INewFlow;
    decisionFlows: any[];
}

export interface INewFlow {
    name: string;
    properties: IProperty[];
    options: IOption[]
}

export interface IProperty {
    id: number;
    name: string;
    weight: number;
    inverted: boolean;
}

export interface IOption {
    id: number;
    name: string;
    values: IValue;
}

export interface IValue {
    [key: string]: number;
}