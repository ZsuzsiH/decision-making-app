import React from 'react';
import {IProperty} from "../../../../../store/user/userTypes";
import styles from './NodeType.module.scss';
import {Slider} from "@mui/material";
import sharedStyles from "../../../../../styles/shared.module.scss";

interface PropertyNodeTypeProps {
    data: IProperty
}

const PropertyNodeType = ({data}: PropertyNodeTypeProps) => {
    return (
        <div className={styles.propertyNode}>
            <div className={sharedStyles.text}>{data.name}</div>
            <hr/>
            <div className={sharedStyles.text}>Weighting: {data.weight}%</div>
            <Slider className={sharedStyles.slider} defaultValue={0} value={data.weight} />
        </div>
    );
}

export default PropertyNodeType;