import React from "react";
import styles from './ShortExplanation.module.scss';
import sharedStyles from "../../../../../styles/shared.module.scss";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useDispatch} from "react-redux";
import {setStep} from "../../../../../store/app/appAction";
import CustomMotionDiv from '../../../../CustomMotionDiv/CustomMotionDiv';

interface IntroPRops {
    name: string;
}

const ShortExplanation = ({name}: IntroPRops) => {

    const dispatch = useDispatch();

    const proceedToNextStep = () => {
        dispatch(setStep(1))
    }

    return (
        <CustomMotionDiv className={styles.introPage}>
            <CustomMotionDiv className={styles.paragraph}>Welcome {name}!</CustomMotionDiv>
            <CustomMotionDiv className={styles.paragraph} duration={1.4}>This is a simple tool to help you make decisions.</CustomMotionDiv>
            <CustomMotionDiv className={styles.paragraph} duration={1.8}>First you need to define the criteria on which you want to base your decision.</CustomMotionDiv>
            <CustomMotionDiv duration={2}>
                <div className={styles.paragraph}>Are you ready?</div>
                <div className={styles.control}>
                    <IconButton className={sharedStyles.iconButton} onClick={proceedToNextStep}>
                        <div className={sharedStyles.text}>Let's do it</div><ArrowCircleRightIcon className={sharedStyles.icon}/>
                    </IconButton>
                </div>
            </CustomMotionDiv>
        </CustomMotionDiv>
    )
}

export default ShortExplanation;