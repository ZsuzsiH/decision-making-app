import styles from './Intro.module.scss';
import React from "react";
import { motion } from "framer-motion"

const Intro = () => {

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "easeIn", duration: 1}}
            className={styles.intro}>
            Haliiii
        </motion.div>
    )
}

export default Intro;