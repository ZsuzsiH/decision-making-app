import React from "react";
import styles from './Home.module.scss';
import Welcome from "../Welcome/Welcome";
import { useAppSelector } from "../../store/store";
import Intro from "../Intro/Intro";

const Home = () => {

    const name = useAppSelector((state) => state.user.name);

    return(
        <div className={styles.home}>
            {!name && <Welcome/>}
            {name && <Intro/>}
        </div>
    )
}

export default Home;
