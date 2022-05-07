import {TextField} from "@mui/material";
import styles from './Welcome.module.scss';
import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {setUserName} from "../../../../../store/user/userAction";
import {useDispatch} from "react-redux";
import CustomMotionDiv from "../../../../CustomMotionDiv/CustomMotionDiv";

const Welcome = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState<string>();

    const saveName = () => {
        if (!name) return;
        dispatch(setUserName(name));
    }

    return (
        <CustomMotionDiv className={styles.welcome}>
            <div>Welcome!</div>
            <div>What is your name?</div>
            <div className={styles.inputField}>
                <TextField
                    InputProps={{className: styles.customInput}}
                    className={styles.customField}
                    variant="standard"
                    color={'secondary'}
                    onChange={(e) => setName(() => e.target.value)}
                />
            </div>
            {name && <CustomMotionDiv className={styles.control}>
                <IconButton className={styles.iconButton} onClick={saveName}>
                    <ArrowCircleRightIcon className={styles.icon}/>
                </IconButton>
            </CustomMotionDiv>}
        </CustomMotionDiv>
    )
}

export default Welcome;