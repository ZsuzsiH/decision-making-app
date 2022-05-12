import React, {useState} from 'react';
import {Property} from "../../../../../store/flow/flowTypes";
import styles from './NodeType.module.scss';
import {Slider} from "@mui/material";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {Handle, Position} from 'react-flow-renderer';
import {useDispatch} from "react-redux";
import {saveDecisionFlow} from "../../../../../store/flow/flowAction";
import {useAppSelector} from "../../../../../store/store";

interface PropertyNodeTypeProps {
    data: Property
}

const PropertyNodeType = ({data}: PropertyNodeTypeProps) => {

    const dispatch = useDispatch();
    const flow = useAppSelector((state) => state.flow);

    const [property, setProperty] = useState<Property>(data);

    const handleSliderChange = (e: Event, value: number|number[]) => {
        setProperty((prev) => ({...prev, weight: value as number}));
    }

    const handleSliderCommitted = (e: React.SyntheticEvent | Event, value: number|number[]) => {
        if (!flow.current) return;
        dispatch(saveDecisionFlow({
            ...flow.current,
            properties: flow.current.properties.map((item) => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        weight: value as number
                    }
                }
                return item;
            })}
        ));
    }

    return (
        <div className={styles.propertyNode} id={`property-${data.id}-node`}>
            <div className={sharedStyles.text}>{property.name}</div>
            <hr/>
            <div className={sharedStyles.text}>Weighting: {property.weight}%</div>
            <Slider
                className={sharedStyles.slider} defaultValue={0}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderCommitted}
                valueLabelDisplay="auto"
                value={property.weight}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id={`property-${data.id}`}
                style={{ top: 'auto', bottom: -5, background: 'var(--color-secondary)', height: '10px', width: '10px' }}
            />
        </div>
    );
}

export default PropertyNodeType;