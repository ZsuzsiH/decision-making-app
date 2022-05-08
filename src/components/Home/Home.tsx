import React from "react";
import styles from './Home.module.scss';
import Intro from "../Step/Intro/Intro";
import Properties from "../Step/Properties/Properties";
import Options from "../Step/Options/Options";
import {useAppSelector} from "../../store/store";
import Result from "../Step/Result/Result";

const Home = () => {

    const step = useAppSelector(state => state.app.step);

    const components = {
        'Intro': Intro,
        'Properties': Properties,
        'Options': Options,
        'Result': Result
    } as { [key: string]: () => JSX.Element };

    return(
        <div className={styles.home}>
            {Object.keys(components).map((item: string, index: number) => {
                const Component = components[item];
                if (index === step) return <Component key={index}/>
            })}
        </div>
    )
}

export default Home;
