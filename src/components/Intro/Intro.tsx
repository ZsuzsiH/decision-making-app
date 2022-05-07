import styles from './Intro.module.scss';
import React from "react";
import { motion } from "framer-motion"
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useDispatch} from "react-redux";
import {setStep} from "../../store/app/appAction";
import CustomMotionDiv from '../CustomMotionDiv/CustomMotionDiv';

interface IntroPRops {
    name: string;
}

const Intro = ({name}: IntroPRops) => {

    const dispatch = useDispatch();

    const proceedToNextStep = () => {
        dispatch(setStep(1))
    }

    return (
        <CustomMotionDiv className={styles.intro}>
            <CustomMotionDiv className={styles.paragraph}>Welcome {name}!</CustomMotionDiv>
            <CustomMotionDiv className={styles.paragraph} duration={1.4}>This is a simple tool to help you make decisions.</CustomMotionDiv>
            <CustomMotionDiv className={styles.paragraph} duration={1.8}>First you need to define the criteria on which you want to base your decision.</CustomMotionDiv>
            <CustomMotionDiv duration={2}>
                <div className={styles.paragraph}>Are you ready?</div>
                <div className={styles.control}>
                    <IconButton className={styles.iconButton} onClick={proceedToNextStep}>
                        <ArrowCircleRightIcon className={styles.icon}/>
                    </IconButton>
                </div>
            </CustomMotionDiv>
        </CustomMotionDiv>
    )
}

export default Intro;