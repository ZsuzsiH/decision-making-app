import {useAppSelector} from "../../../store/store";
import {useEffect, useState} from "react";
import {IOption, IOptionSummary, IProperty} from "../../../store/user/userTypes";
import FlowChart from "./components/FlowChart/FlowChart";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const Result = () => {

    const flow = useAppSelector((state) => state.user.flow);
    const [normWeightProps, setNormWeightProps] = useState<IProperty[]>();
    const [attributes, setAttributes] = useState<{ [key:string]: {min?: number, max?: number }}>();
    const [normalisedData, setNormalisedData] = useState<IOption[]>();
    const [weightedData, setWeightedData] = useState<IOption[]>();
    const [summary, setSummary] = useState<IOptionSummary[]>();
    const [winner, setWinner] = useState<IOptionSummary[]>();

    useEffect(() => {
        /*
            Normalizing the weights in each property
         */
        let sum: number = 0;
        if (!flow) return;
        flow.properties.forEach(a => sum += a.weight);
        setNormWeightProps(() => flow.properties.map(item => {
            return {
                ...item,
                weight: (item.weight/sum)
            };
        }));
    }, [flow]);

    useEffect(() => {
        /*
            Setting the beneficial (max) and non-beneficial (min) attributes for each property
         */

        if (!flow) return;
        const options = [...flow.options.map(option => option.values)];
        const boundaries = flow.properties.reduce((acc: {[key:string]: {}}, cur) => {
            acc[cur.name] = cur.inverted ?
                {min: Math.min(...options.map(item => item[cur.name]))} :
                {max: Math.max(...options.map(item => item[cur.name]))}
            return acc;
        }, {});

        setAttributes(() => boundaries);
    }, [flow]);

    useEffect(() => {
        /*
            Data table normalisation
         */
        if (!flow || !attributes) return;
        const attributeKeys = Object.keys(attributes);

        const data = flow.options.map((item) => {
            const updatedOptions = attributeKeys.map(attribute => {
                const min = attributes[attribute].min;
                const max = attributes[attribute].max;
                return  {[attribute]: min ? min/item.values[attribute] : max ? item.values[attribute]/max : 0}
            });

            return {
                ...item,
                values: Object.assign({}, ...updatedOptions)
            };
        })
        setNormalisedData(() => data);
    }, [flow, attributes]);

    useEffect(() => {
        /*
            Multiplying each parameter with their respective weight
         */

        if (!normWeightProps) return;

        const weightUpdatedData = normalisedData?.map((item) => {
            const updatedValues = Object.keys(item.values).map(key => {
                const prop = normWeightProps.find((item) => item.name === key);
                if (!prop) return item.values;
                return {
                    [key]: item.values[key]*prop.weight
                }
            });

            return {
                ...item,
                values: Object.assign({}, ...updatedValues)
            }
        })

        setWeightedData(() => weightUpdatedData);

    }, [normWeightProps, normalisedData]);

    useEffect(() => {
        /*
            Sum all values for each option
         */

        if (!weightedData) return;

        const optionsSummary = weightedData?.map((item) => {
            const sumValues = Object.values(item.values).reduce((a, b) => a + b);
            return {...item, valueSum: sumValues};
        })

        setSummary(() => optionsSummary);
    }, [weightedData]);

    useEffect(() => {
        /*
            Find the winner
         */
        if (!summary) return;
        const max = Math.max.apply(Math, summary.map((option) =>  option.valueSum ));
        const winner = summary.filter(item => item.valueSum === max);
        setWinner(() => winner);
    }, [summary])

    if (!flow?.properties || !summary || !winner || !normalisedData) {
        return (
            <CircularProgress />
        )
    }

    return (
        <div style={{width: '1500px', height: '1500px'}}>
            <FlowChart properties={flow.properties} normalisedData={normalisedData} summary={summary} winner={winner}/>
        </div>
    )
}

export default Result