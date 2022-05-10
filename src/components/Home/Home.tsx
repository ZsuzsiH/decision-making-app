import React from "react";
import styles from './Home.module.scss';
import Intro from "../Step/Intro/Intro";
import Properties from "../Step/Properties/Properties";
import Options from "../Step/Options/Options";
import Result from "../Step/Result/Result";

interface HomeProps {
    stepNumber: number
}

const Home = ({stepNumber}: HomeProps) => {

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
                if (index === stepNumber) return <Component key={index}/>
            })}
        </div>
    )
}

export default Home;
