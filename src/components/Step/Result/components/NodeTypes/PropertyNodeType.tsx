import React from 'react';
import {IProperty} from "../../../../../store/flow/flowTypes";
import styles from './NodeType.module.scss';
import {Slider} from "@mui/material";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {Handle, Position} from 'react-flow-renderer';

interface PropertyNodeTypeProps {
    data: IProperty
}

const PropertyNodeType = ({data}: PropertyNodeTypeProps) => {
    return (
        <div className={styles.propertyNode} id={`property-${data.id}-node`}>
            <div className={sharedStyles.text}>{data.name}</div>
            <hr/>
            <div className={sharedStyles.text}>Weighting: {data.weight}%</div>
            <Slider className={sharedStyles.slider} defaultValue={0} value={data.weight} />
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