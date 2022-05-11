import React from 'react';
import {IOptionSummary} from "../../../../../store/flow/flowTypes";
import styles from './NodeType.module.scss';
import {Slider} from "@mui/material";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {Handle, Position} from "react-flow-renderer";

interface OptionNodeTypeProps {
    data: {
        option: IOptionSummary;
        finalScore: number;
    };
}

const OptionNodeType = ({data}: OptionNodeTypeProps) => {
    return (
        <div className={styles.optionNode} id={`option-${data.option.name}-node`}>
            <Handle
                type="target"
                position={Position.Top}
                id={`option-${data.option.id}-target`}
                style={{ top: -5, bottom: 'auto', background: 'var(--color-dark)', height: '10px', width: '10px' }}
            />
            <div className={sharedStyles.text}>{data?.option?.name}</div>
            <hr/>
            {Object.entries(data.option.values).map(([key, value], index) => {
                return (
                    <React.Fragment key={index}>
                        <div className={sharedStyles.text}>{key}: {Math.round(value*100)}%</div>
                        <Slider className={sharedStyles.slider} disabled={true} defaultValue={0} value={value*100} />
                    </React.Fragment>
                )
            })}
            <hr/>
            <div className={sharedStyles.text}>Score</div>
            <div className={sharedStyles.text}>{Math.round(data.finalScore*100)}</div>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`option-${data.option.id}-source`}
                style={{ top: 'auto', bottom: -5, background: 'var(--color-secondary)', height: '10px', width: '10px' }}
            />
        </div>
    );
}

export default OptionNodeType;