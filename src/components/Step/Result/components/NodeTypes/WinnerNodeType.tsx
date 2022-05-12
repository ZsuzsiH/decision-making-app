import React from 'react';
import {OptionSummary} from "../../../../../store/flow/flowTypes";
import styles from './NodeType.module.scss';
import sharedStyles from "../../../../../styles/shared.module.scss";
import {Handle, Position} from "react-flow-renderer";

interface PropertyNodeTypeProps {
    data: OptionSummary
}

const WinnerNodeType = ({data}: PropertyNodeTypeProps) => {
    return (
        <div className={styles.propertyNode} id="winner-node">
            <Handle
                type="target"
                position={Position.Top}
                id={`winner-${data.id}-target`}
                style={{ top: -5, bottom: 'auto', background: 'var(--color-dark)', height: '10px', width: '10px' }}
            />
            <div className={sharedStyles.text}>Winner</div>
            <hr/>
            <div className={styles.score}>{data.name}</div>
        </div>
    );
}

export default WinnerNodeType;