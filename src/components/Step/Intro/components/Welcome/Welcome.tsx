import {TextField} from "@mui/material";
import styles from './Welcome.module.scss';
import sharedStyles from '../../../../../styles/shared.module.scss';
import React, {ChangeEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {setUserName} from "../../../../../store/user/userAction";
import {useDispatch} from "react-redux";
import CustomMotionDiv from "../../../../CustomMotionDiv/CustomMotionDiv";
import useValidation from "../../../../../hooks/useValidation";

const Welcome = () => {

    const initialFormState = {
        name: ''
    }

    const dispatch = useDispatch();
    const {validateName} = useValidation();
    const [data, setData] = useState<{name: string}>(initialFormState);
    const [errors, setError] = useState<{[key:string]: string}>({});

    const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        setData((prev) => ({...prev, [target.name]: target.value}));
    }

    const validateFields = (): boolean => {
        const errors = {name: validateName(data.name) || ''}
        setError(() => errors)
        return !!errors.name;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateFields()) return;

        dispatch(setUserName(data.name));
    }
    return (
        <CustomMotionDiv className={styles.welcomePage}>
            <div>Welcome!</div>
            <div>What is your name?</div>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <TextField
                    InputProps={{
                        endAdornment: <IconButton className={sharedStyles.iconButton} type="submit">
                            <ArrowCircleRightIcon className={sharedStyles.icon}/>
                        </IconButton>,
                        className: styles.customInput
                    }}
                    className={styles.customField}
                    variant="standard"
                    color={'secondary'}
                    onChange={handleFieldChange}
                    name='name'
                    error={!!errors.name}
                    label={errors.name}
                />
            </form>
        </CustomMotionDiv>
    )
}

export default Welcome;