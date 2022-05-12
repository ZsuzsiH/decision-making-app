export const START_FLOW = "START_FLOW";
export const SAVE_FLOW = "SAVE_FLOW";
export const RESET_FLOW = "RESET_FLOW";

export interface IFlowState {
    current?: ICurrentFlow;
}

export interface ICurrentFlow {
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
    score?: number;
}

export interface IOptionSummary extends IOption {
    valueSum: number
}

export interface IValue {
    [key: string]: number;
}