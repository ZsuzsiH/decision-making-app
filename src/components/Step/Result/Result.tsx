import FlowChart from "./components/FlowChart/FlowChart";
import React from "react";
import sharedStyles from "../../../styles/shared.module.scss";
import styles from "./Result.module.scss";
import CustomMotionDiv from "../../CustomMotionDiv/CustomMotionDiv";

const Result = () => {
    return (
        <CustomMotionDiv className={sharedStyles.page}>
            <div className={styles.title}>Your results</div>
            <div className={styles.subtitle}>You can always edit your options and criteria from the menu</div>
            <div style={{width: '2000px', height: '1500px'}}>
                <FlowChart/>
            </div>
        </CustomMotionDiv>
    )
}

export default Result;
