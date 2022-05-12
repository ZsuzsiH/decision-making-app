import {ICurrentFlow, IOption, IOptionSummary, IProperty} from "../store/flow/flowTypes";

interface Attributes {
    [key: string]: { min?: number, max?: number }
}

export const winnerCalculation = (flow: ICurrentFlow) => {

    if (!flow) return;

    /*
        Normalizing the weights in each property
     */
    let sum: number = 0;
    flow.properties.forEach(a => sum += a.weight);
    const normalisedWeight: IProperty[] = flow.properties.map(item => {
        return {
            ...item,
            weight: (item.weight / sum)
        };
    });

    /*
        Finding beneficial (max) and non-beneficial (min) attributes for each property
    */
    const options = [...flow.options.map(option => option.values)];
    const attributes: Attributes = flow.properties.reduce((acc: { [key: string]: {} }, cur) => {
        acc[cur.name] = cur.inverted ?
            {min: Math.min(...options.map(item => item[cur.name]))} :
            {max: Math.max(...options.map(item => item[cur.name]))}
        return acc;
    }, {});

    /*
        Data table normalisation
    */
    const attributeKeys = Object.keys(attributes);
    const normalisedData: IOption[] = flow.options.map((item) => {
        const updatedOptions = attributeKeys.map(attribute => {
            const min = attributes[attribute].min;
            const max = attributes[attribute].max;
            return {[attribute]: min ? min / item.values[attribute] : max ? item.values[attribute] / max : 0}
        });

        return {
            ...item,
            values: Object.assign({}, ...updatedOptions)
        };
    });

    /*
        Multiplying each parameter with their respective weight
    */
    const weightedData: IOption[] = normalisedData.map((item) => {
        const updatedValues = Object.keys(item.values).map(key => {
            const prop = normalisedWeight.find((item) => item.name === key);
            if (!prop) return item.values;
            return {
                [key]: item.values[key] * prop.weight
            }
        });

        return {
            ...item,
            values: Object.assign({}, ...updatedValues)
        }
    });

    /*
       Sum all values for each option
    */
    const summary: IOptionSummary[] = weightedData.map((item) => {
        const sumValues = Object.values(item.values).reduce((a, b) => a + b);
        return {...item, valueSum: sumValues};
    })

    /*
        Find the winner
    */
    const maxScore = Math.max.apply(Math, summary.map((option) => option.valueSum));
    const winner: IOptionSummary[] = summary.filter(item => item.valueSum === maxScore);

    return {normalisedData, summary, winner}
}