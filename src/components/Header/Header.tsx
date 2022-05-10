import styles from './Header.module.scss';
import React from "react";
import {useAppSelector} from "../../store/store";
import DropdownMenu from "./Menu/Menu";

const Header = () => {

    const userName = useAppSelector((state) => state.user.name);
    const flow = useAppSelector((state) => state.flow);

    return(
        <div className={styles.header}>
            <div>Decisions made easy</div>
            <DropdownMenu flow={flow} userName={userName || ''}/>
        </div>
    )
}

export default Header;