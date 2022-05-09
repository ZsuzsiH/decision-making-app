import styles from './PropertyEdit.module.scss';
import sharedStyles from '../../../../../styles/shared.module.scss';
import {Slider, Stack, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import {IProperty} from "../../../../../store/user/userTypes";
import IconButton from "@mui/material/IconButton";
import useValidation from '../../../../../hooks/useValidation';

interface PropertyProps {
    onSave: (property: IProperty) => void;
}

const PropertyEdit = ({onSave}: PropertyProps) => {

    const initialFormState = {
        name: '',
        weight: 0,
        inverted: false
    }

    const {validateName, validateNumber} = useValidation();
    const [data, setData] = useState<IProperty>(initialFormState);
    const [errors, setError] = useState<{[key:string]: string}>({});

    const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        setData((prev) => ({...prev, [target.name]: target.value}));
    }

    const handleSliderChange = (e: Event, value: number|number[]) => {
        setData((prev) => ({...prev, weight: value as number}))
    }

    const handleCheckbox = (inverted: boolean) => {
        setData((prev) => ({...prev, inverted}))
    }

    const validateFields = (fields: IProperty): boolean => {
        const errors = {
            name: validateName(fields.name) || '',
            weight: validateNumber(fields.weight) || ''
        }
        setError(() => errors)
        return !!errors.name || !!errors.weight;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateFields(data)) return;
        const updated = {
            name: data.name,
            weight: data.weight,
            inverted: data.inverted
        }
        onSave(updated);
    }

    return (
        <div className={styles.propertyCard} onBlur={handleSubmit}>
            <div>
                <div className={sharedStyles.text}>Criteria name</div>
                <TextField
                    InputProps={{className: sharedStyles.customInput}}
                    value={data.name}
                    className={sharedStyles.customField}
                    name='name'
                    color={'secondary'}
                    onChange={handleFieldChange}
                    error={!!errors.name}
                    label={errors.name}
                />
            </div>
            <Stack spacing={2} direction="column" >
                <div className={styles.text}>Criteria importance</div>
                <Slider className={sharedStyles.slider} name='weight' defaultValue={0} value={data.weight} onChange={handleSliderChange} />
                <div className={sharedStyles.error}>{errors.weight}</div>
            </Stack>
            <div>
                <div className={sharedStyles.text}>This criteria is:</div>
                <div className={sharedStyles.checkbox}>
                    <Checkbox
                        checked={data.inverted}
                        onChange={() => handleCheckbox(true)}
                    />the lower the better</div>
                <div className={sharedStyles.checkbox}>
                    <Checkbox
                        checked={!data.inverted}
                        onChange={() => handleCheckbox(false)}
                    /> the higher the better</div>
            </div>
            <div className={sharedStyles.control}>
                <IconButton type="submit" onClick={handleSubmit}>
                    <SaveIcon color={'primary'} className={sharedStyles.controlIcon}/>
                </IconButton>
            </div>
        </div>
    )
}

export default PropertyEdit;