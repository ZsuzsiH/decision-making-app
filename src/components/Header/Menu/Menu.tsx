import {List, Menu, MenuItem} from "@mui/material";
import React from "react";
import styles from './Menu.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {Action} from "redux";
import {SET_STEP} from "../../../store/app/appTypes";
import {PURGE} from "redux-persist";
import {FlowState, RESET_FLOW} from "../../../store/flow/flowTypes";

interface DropdownMenuProps {
    userName: string;
    flow: FlowState
}

const DropdownMenu = ({userName, flow}: DropdownMenuProps) => {

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex] = React.useState(1);
    const isOpen = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const options = {
        'New flow':  {
            action: {type: RESET_FLOW},
            disabled: false
        },
        'Edit criteria': {
            action: {type: SET_STEP, payload: 1},
            disabled: !flow.current?.properties?.length
        },
        'Edit options': {
            action: {type: SET_STEP, payload: 2},
            disabled: !flow.current?.properties?.length || !flow.current?.options?.length
        },
        'See results': {
            action: {type: SET_STEP, payload: 3},
            disabled: !flow.current?.properties?.length || !flow.current?.options?.length
        },
        'Remove all data': {
            action: {type: PURGE, key: "root", result: () => null},
            disabled: false
        }
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        action: Action,
    ) => {
        dispatch(action);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.userName}>{userName}</div>
            <List
                component="div"
                aria-label="Menu"
                className={styles.menu}
            >
                <IconButton
                    className={styles.menuButton}
                    onClick={handleClickListItem} aria-expanded={isOpen ? 'true' : undefined} id="menu-button"
                    size="small" color="primary" aria-label="add"
                >
                    {isOpen ?
                        <KeyboardArrowUpIcon color="primary"/> :
                        <KeyboardArrowDownIcon color="primary"/>
                    }
                </IconButton>
            </List>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                className={styles.menuContainer}
                MenuListProps={{
                    className: styles.menuList,
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {Object.entries(options).map(([key, value], index) => (
                    <MenuItem
                        key={key}
                        disabled={value.disabled}
                        className={styles.menuItem}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, value.action)}
                    >
                        {key}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
};

export default DropdownMenu;