export const START_FLOW = "START_FLOW";
export const SAVE_FLOW = "SAVE_FLOW";
export const RESET_FLOW = "RESET_FLOW";

export interface FlowState {
    current?: CurrentFlow;
}

export interface CurrentFlow {
    name: string;
    properties: Property[];
    options: Option[]
}

export interface Property {
    id: number;
    name: string;
    weight: number;
    inverted: boolean;
}

export interface Option {
    id: number;
    name: string;
    values: Value;
    score?: number;
}

export interface OptionSummary extends Option {
    valueSum: number
}

export interface Value {
    [key: string]: number;
}