import React from 'react';
import {IOptionSummary} from "../../../../../store/user/userTypes";
import styles from './NodeType.module.scss';
import sharedStyles from "../../../../../styles/shared.module.scss";

interface PropertyNodeTypeProps {
    data: IOptionSummary
}

const WinnerNodeType = ({data}: PropertyNodeTypeProps) => {
    return (
        <div className={styles.propertyNode}>
            <div className={sharedStyles.text}>Winner</div>
            <hr/>
            <div className={sharedStyles.text}>{data.name}</div>
        </div>
    );
}

export default WinnerNodeType;