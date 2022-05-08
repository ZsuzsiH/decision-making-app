import styles from './Property.module.scss';
import sharedStyles from '../../../../../styles/shared.module.scss';
import {Slider, Stack, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import {IProperty} from "../../../../../store/user/userTypes";
import IconButton from "@mui/material/IconButton";

interface PropertyProps {
    property: IProperty;
    onSave: (property: IProperty) => void;
}

const Property = ({property, onSave}: PropertyProps) => {

    const [propertyName, setPropertyName] = useState<string>(property.name);
    const [propertyImportance, setPropertyImportance] = useState<number>(property.weight);
    const [propertyInverted, setPropertyInverted] = useState<boolean>(property.inverted);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // TODO validations

        const updated = {
            id: property.id,
            name: propertyName,
            weight: propertyImportance,
            inverted: propertyInverted
        }

        onSave(updated);
    }, [saved])

    return (
        <div className={styles.propertyCard}>
            <div>
                <div className={sharedStyles.text}>Criteria name</div>
                <TextField
                    InputProps={{className: sharedStyles.customInput}}
                    value={propertyName}
                    className={sharedStyles.customField}
                    variant={'standard'}
                    disabled={saved}
                    color={'secondary'}
                    onChange={(e) => setPropertyName(() => e.target.value)}
                />
            </div>
            <Stack spacing={2} direction="column" >
                <div className={styles.text}>Criteria importance</div>
                <Slider disabled={saved} className={sharedStyles.slider} defaultValue={0} value={propertyImportance} onChange={(e, value) => setPropertyImportance(() => value as number)} />
            </Stack>
            <div>
                <div className={sharedStyles.text}>This criteria is:</div>
                <div className={sharedStyles.checkbox}>
                    <Checkbox
                        disabled={saved}
                        checked={propertyInverted}
                        onChange={() => setPropertyInverted(true)}
                    />the lower the better</div>
                <div className={sharedStyles.checkbox}>
                    <Checkbox
                        disabled={saved}
                        checked={!propertyInverted}
                        onChange={() => setPropertyInverted(false)}
                    /> the higher the better</div>
            </div>
            <div className={sharedStyles.control}>
                { saved ?
                    <IconButton onClick={() => setSaved(() => false)}>
                        <EditIcon color={'primary'} className={sharedStyles.controlIcon}/>
                    </IconButton>
                    :
                    <IconButton disabled={!propertyName} onClick={() => setSaved(() => true)}>
                        <SaveIcon color={'primary'} className={sharedStyles.controlIcon}/>
                    </IconButton>
                }
            </div>
        </div>
    )
}

export default Property;