import {TextField} from "@mui/material";
import styles from './Welcome.module.scss';
import React, {useEffect, useState} from "react";
import { motion } from "framer-motion"
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {setUserName} from "../../store/user/userAction";
import {useDispatch} from "react-redux";

const Welcome = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState<string>();

    const saveName = () => {
        if (!name) return;
        dispatch(setUserName(name));
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "easeIn", duration: 1}}
            className={styles.welcome}>
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
            {name && <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ease: "easeIn", duration: 1}}
                className={styles.control}
            >
                <IconButton className={styles.iconButton} onClick={saveName}>
                    <ArrowCircleRightIcon className={styles.icon}/>
                </IconButton>
            </motion.div>}
        </motion.div>
    )
}

export default Welcome;