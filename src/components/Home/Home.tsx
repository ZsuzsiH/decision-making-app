import React from "react";
import styles from './Home.module.scss';
import Welcome from "../Welcome/Welcome";
import { useAppSelector } from "../../store/store";
import Intro from "../Intro/Intro";

const Home = () => {

    const name = useAppSelector((state) => state.user.name);
    const step = useAppSelector((state) => state.app.step);

    return(
        <div className={styles.home}>
            {step === 0 &&
                <React.Fragment>
                    {!name && <Welcome/>}
                    {name && <Intro name={name}/>}
                </React.Fragment>
            }
            {step === 1 &&
                <React.Fragment>

                </React.Fragment>
            }
        </div>
    )
}

export default Home;
