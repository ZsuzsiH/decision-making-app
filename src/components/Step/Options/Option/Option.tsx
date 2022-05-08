import styles from './Option.module.scss';
import sharedStyles from '../../../../styles/shared.module.scss';
import {Slider, Stack, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {useEffect, useState} from "react";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {IOption, IValue} from "../../../../store/user/userTypes";

interface PropertyProps {
    option: IOption;
    onSave: (option: IOption) => void;
}

const Option = ({option, onSave}: PropertyProps) => {

    const [optionName, setOptionName] = useState<string>(option.name);
    const [optionValues, setOptionValues] = useState<IValue>(option.values);
    const [inputType, setInputType] = useState<{[key:string]:string}>();

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!option) return;
        const values = Object.keys(option.values).map(item => item).reduce((acc: {[key:string]: string}, cur) => {
            acc[cur] = 'number'
            return acc
        }, {});
        setInputType(() => values);
    }, [option])

    useEffect(() => {
        // TODO validations

        const updated = {
            id: option.id,
            name: optionName,
            values: optionValues
        }

        onSave(updated);
    }, [saved])

    const setValues = (name:string, value: any) => {
        setOptionValues((prev) => ({...prev, ...value}))
    }

    const handleAlignmentChange = (
        name: string,
        newAlignment: string,
    ) => {
        setInputType((prev) => ({...prev, ...{[name]: newAlignment}}));
    };

    return (
        <div className={styles.optionCard}>
            <div>
                <div className={sharedStyles.text}>Option name</div>
                <TextField
                    InputProps={{className: sharedStyles.customInput}}
                    value={optionName}
                    className={sharedStyles.customField}
                    variant={'standard'}
                    disabled={saved}
                    color={'secondary'}
                    onChange={(e) => setOptionName(() => e.target.value)}
                />
            </div>
            {Object.entries(optionValues).map(([name, value], index) => (
                <React.Fragment key={index}>
                    {inputType && inputType[name] &&
                        <Stack spacing={2} direction="column" >
                            <div className={sharedStyles.toggle}>
                                {name}
                                <ToggleButtonGroup
                                    color="primary"
                                    value={inputType[name]}
                                    exclusive
                                    onChange={(e, value) => handleAlignmentChange(name, value)}
                                >
                                    <ToggleButton disabled={inputType[name] === 'number'} className={styles.toggleButton} value="number">Number</ToggleButton>
                                    <ToggleButton disabled={inputType[name] === 'slider'} className={styles.toggleButton} value="slider">Slider</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            {inputType[name] === 'number' ?
                                <TextField
                                    InputProps={{className: sharedStyles.customInput}}
                                    value={value}
                                    variant={'standard'}
                                    disabled={saved}
                                    color={'secondary'}
                                    onFocus={(event) => event.target.select()}
                                    onChange={(e) => setValues(name, {[name]: parseInt(e.target.value, 10)})}
                                /> :
                                <Slider disabled={saved} className={sharedStyles.slider} defaultValue={0} value={value}
                                        onChange={(e, value) => setValues(name, {[name]: value as number})}
                                />}
                        </Stack>}
                </React.Fragment>
            ))}
            <div className={sharedStyles.control}>
                { saved ?
                    <IconButton onClick={() => setSaved(() => false)}>
                        <EditIcon color={'primary'} className={styles.controlIcon}/>
                    </IconButton>
                    :
                    <IconButton disabled={!optionName} onClick={() => setSaved(() => true)}>
                        <SaveIcon color={'primary'} className={styles.controlIcon}/>
                    </IconButton>
                }
            </div>
        </div>
    )
}

export default Option;