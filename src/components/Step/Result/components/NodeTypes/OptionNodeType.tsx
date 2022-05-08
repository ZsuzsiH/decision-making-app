import React from 'react';
import {IOptionSummary} from "../../../../../store/user/userTypes";
import styles from './NodeType.module.scss';
import {Slider} from "@mui/material";
import sharedStyles from "../../../../../styles/shared.module.scss";

interface OptionNodeTypeProps {
    data: {
        option: IOptionSummary;
        finalScore: number;
    };
}

const OptionNodeType = ({data}: OptionNodeTypeProps) => {
    return (
        <div className={styles.optionNode}>
            <div className={sharedStyles.text}>{data?.option?.name}</div>
            <hr/>
            {Object.entries(data.option.values).map(([key, value], index) => {
                return (
                    <React.Fragment key={index}>
                        <div className={sharedStyles.text}>{key}: {Math.round(value*100)}%</div>
                        <Slider className={sharedStyles.slider} defaultValue={0} value={value*100} />
                    </React.Fragment>
                )
            })}
            <hr/>
            <div className={sharedStyles.text}>Score</div>
            <div className={sharedStyles.text}>{Math.round(data.finalScore*100)}</div>
        </div>
    );
}

export default OptionNodeType;