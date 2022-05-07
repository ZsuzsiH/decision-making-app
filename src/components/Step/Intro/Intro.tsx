import React from "react";
import { useAppSelector } from "../../../store/store";
import ShortExplanation from "./components/ShortExplanation/ShortExplanation";
import Welcome from "./components/Welcome/Welcome";

const Intro = () => {

    const name = useAppSelector((state) => state.user.name);

    return(
        <div>
            {!name && <Welcome/>}
            {name && <ShortExplanation name={name}/>}
        </div>
    )
}

export default Intro;
