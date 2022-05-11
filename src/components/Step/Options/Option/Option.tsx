import styles from './Option.module.scss';
import sharedStyles from '../../../../styles/shared.module.scss';
import {Slider, Stack, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {IOption} from "../../../../store/flow/flowTypes";
import useValidation from "../../../../hooks/useValidation";

interface PropertyProps {
    option: IOption;
    onSave: (option: IOption) => void;
    saved: boolean;
    onEdit?: (id: number) => void
}

interface IOptionError {
    name?: string;
    values?: {[key:string]: string}
}

const Option = ({option, onSave, saved, onEdit}: PropertyProps) => {

    const initialFormState = {
        id: option.id,
        name: option.name || '',
        values: option.values || {}
    }

    const {validateName, validateNumber} = useValidation();
    const [data, setData] = useState<IOption>(initialFormState);
    const [inputType, setInputType] = useState<{[key:string]:string}>();
    const [errors, setError] = useState<IOptionError>();

    const handleFieldChange = (e: ChangeEvent, nested = false): void => {
        const target = e.target as HTMLInputElement;
        if (nested) {
            setData((prev) => ({...prev, values: {...prev.values, [target.name]: parseFloat(target.value)}}));
            return;
        }
        setData((prev) => ({...prev, [target.name]: target.value}));
    }

    const handleSliderChange = (e: Event, value: number|number[], key: string) => {
        setData((prev) => ({...prev, values: {...prev.values, [key]: value as number}}));
    }

    useEffect(() => {
        /*
            Setting initial type value for each property
            Based on this, showing number field or the slider
         */
        if (!option) return;
        const values = Object.keys(option.values).map(item => item).reduce((acc: {[key:string]: string}, cur) => {
            acc[cur] = 'number'
            return acc
        }, {});
        setInputType(() => values);
    }, [option])


    const validateFields = (): boolean => {
        const errors = {
            name: validateName(data.name) || '',
            values: Object.assign({}, ...Object.entries(data.values).map(([key, value], index) => {
                return {[key]: validateNumber(value) || ''}
            }))
        }
        setError(() => errors)
        return !!errors.name || !!errors.values.length;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateFields()) return;
        const updated = {
            id: option.id,
            name: data.name,
            values: data.values
        }
        onSave(updated);
    }

    const handleAlignmentChange = (name: string, newAlignment: string) => {
        setInputType((prev) => ({...prev, ...{[name]: newAlignment}}));
    };

    return (
        <div className={styles.optionCard}>
            <div>
                <div className={sharedStyles.text}>Option name</div>
                <TextField
                    InputProps={{className: sharedStyles.customInput}}
                    value={data.name}
                    className={sharedStyles.customField}
                    variant={'standard'}
                    disabled={saved}
                    color={'secondary'}
                    onChange={handleFieldChange}
                    error={!!errors?.name}
                    label={errors?.name}
                    name='name'
                />
            </div>
            {Object.entries(data.values).map(([name, value], index) => (
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
                                    value={value||''}
                                    name={name}
                                    type="number"
                                    disabled={saved}
                                    onFocus={(event) => event.target.select()}
                                    InputProps={{className: sharedStyles.customInput}}
                                    InputLabelProps={{shrink: true}}
                                    error={!!errors?.values?.[name]}
                                    onChange={(e) => handleFieldChange(e, true)}
                                /> :
                                <Slider
                                    disabled={saved}
                                    className={sharedStyles.slider}
                                    defaultValue={0}
                                    value={value}
                                    onChange={(e: Event, value) => handleSliderChange(e, value, name)}
                                />
                            }
                            {errors?.values &&  <div className={sharedStyles.error}>{errors.values[name]}</div>}
                        </Stack>}
                </React.Fragment>
            ))}
            <div className={sharedStyles.control}>
                { saved ?
                    <IconButton id="option-edit" onClick={() => onEdit && onEdit(option.id)}>
                        <EditIcon color={'primary'} className={styles.controlIcon}/>
                    </IconButton>
                    :
                    <IconButton id="option-save" onClick={handleSubmit}>
                        <SaveIcon color={'primary'} className={styles.controlIcon}/>
                    </IconButton>
                }
            </div>
        </div>
    )
}

export default Option;