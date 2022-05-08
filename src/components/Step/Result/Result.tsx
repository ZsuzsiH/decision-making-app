import {useAppSelector} from "../../../store/store";
import {useEffect, useState} from "react";
import {IOption, IProperty, IValue} from "../../../store/user/userTypes";

const Result = () => {

    const flow = useAppSelector((state) => state.user.flow);
    const [normWeightProps, setNormWeightProps] = useState<IProperty[]>();
    const [attributes, setAttributes] = useState<{ [key:string]: {min?: number, max?: number }}>();
    const [normalisedData, setNormalisedData] = useState<IOption[]>();

    useEffect(() => {
        /*
            Normalizing the weights in each property
         */
        let sum: number = 0;
        if (!flow) return;
        const normalizesProperties = [...flow.properties];
        normalizesProperties.forEach(a => sum += a.weight);
        setNormWeightProps(() => normalizesProperties.map(item => {
            return {
                ...item,
                weight: (item.weight/sum*100)
            }
        }))
    }, [flow])

    useEffect(() => {
        /*
            Setting the beneficial (max) and non-beneficial (min) attributes for each property
         */
        // return;
        if (!flow) return;
        const normalizedAttributes = [...flow.properties];
        const normalizedOptions = [...flow.options.map(option => option.values)];
        const boundaries = normalizedAttributes.reduce((acc: {[key:string]: {}}, cur) => {
            acc[cur.name] = cur.inverted ?
                {min: Math.min(...normalizedOptions.map(item => item[cur.name]))} :
                {max: Math.max(...normalizedOptions.map(item => item[cur.name]))}
            return acc;
        }, {});

        setAttributes(() => boundaries);
    }, [flow])

    useEffect(() => {
        /*
            Data table normalisation
         */
        if (!flow || !attributes) return;
        const normalizedData: IOption[] = [...flow.options];
        const attributeKeys = Object.keys(attributes);

        const data = normalizedData.map((item) => {
            const updatedOptions = attributeKeys.map(attribute => {
                const min = attributes[attribute].min;
                const max = attributes[attribute].max;
                return  {[attribute]: min ? min/item.values[attribute] : max ? item.values[attribute]/max : 0}
            })
            const updatedValues = Object.assign({}, ...updatedOptions)
            return {
                ...item,
                values: updatedValues
            }
        })
        setNormalisedData(() => data);
    }, [flow, attributes])

    return (
        <div>
            1. sliders section /editable/
            <br/>
            2. react flow with options and properties
        </div>
    )
}

export default Result