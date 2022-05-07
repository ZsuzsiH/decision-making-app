export const SET_NAME = "SET_NAME";
export const START_FLOW = "START_FLOW";
export const SAVE_FLOW = "SAVE_FLOW";
export const SAVE_PROPERTY = "SAVE_PROPERTY";

export interface IUserState {
    name?: string;
    newFlow?: INewFlow;
    decisionFlows: any[];
}

export interface INewFlow {
    name: string;
    properties: IProperty[];
}

export interface IProperty {
    id: number;
    name: string;
    weight: number;
    inverted: boolean;
}

export interface IItem {
    name: string;
}