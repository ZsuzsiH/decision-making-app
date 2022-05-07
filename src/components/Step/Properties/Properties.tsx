import React, {useEffect, useState} from "react";
import styles from "./Properties.module.scss";
import CustomMotionDiv from "../../CustomMotionDiv/CustomMotionDiv";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {saveDecisionFlow, startDecisionFlow} from "../../../store/user/userAction";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useAppSelector} from "../../../store/store";
import Property from "./components/Property/Property";
import IconButton from "@mui/material/IconButton";
import { IProperty } from "../../../store/user/userTypes";

const Properties = () => {

    const dispatch = useDispatch();
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [addNew, setAddNew] = useState<boolean>(false);
    const newFlow = useAppSelector((state) => state.user.newFlow);
    const [name, setName] = useState<string>();

    const setFlowName = () => {
        if (!name) return;
        dispatch(startDecisionFlow(name));
    }

    const updateProperties = (property: IProperty) => {
        const updatedProperties = [...properties];
        const index = updatedProperties.findIndex(item => item.id === property?.id);
        if (index !== -1) updatedProperties[index] = property;
        else updatedProperties.push(property);

        setProperties(() => (updatedProperties));
        setAddNew(() => false);
    }
    const updateNewFlow = () => {
        dispatch(saveDecisionFlow({name, properties}))
    }

    return(
        <CustomMotionDiv className={styles.properties}>
            <div className={styles.title}>Now let's set some criteria. Don't worry about it too much, you can always come back to make some changes.</div>
            <CustomMotionDiv className={styles.form}>
                <div className={styles.subtitle}>What will you name this decision flow?</div>
                <div className={styles.inputField}>
                    <TextField
                        InputProps={{
                            className: styles.customInput,
                            endAdornment: (
                                <ArrowCircleRightIcon className={styles.fieldIcon} onClick={setFlowName}/>
                            )
                        }}
                        className={styles.customField}
                        variant="standard"
                        color={'secondary'}
                        onChange={(e) => setName(() => e.target.value)}
                    />
                </div>
            </CustomMotionDiv>
            {newFlow?.name && <CustomMotionDiv>
                <div className={styles.subtitle}>Now add some criteria</div>
                <div className={styles.propertyList}>
                    {properties && properties.length !== 0 && properties.map((property, index) => (
                        <Property
                            key={index}
                            property={property}
                            onSave={updateProperties}
                        />
                    ))}
                    {addNew && <Property
                        property={{id: properties.length, name: '', weight: 0, inverted: false}}
                        onSave={updateProperties}
                    />}
                    <CustomMotionDiv className={styles.addPropertyButton}>
                        <AddCircleIcon className={styles.addIcon} onClick={() => setAddNew(true)}/>
                    </CustomMotionDiv>
                </div>

            </CustomMotionDiv>}
            {newFlow?.properties && newFlow.properties.length >= 2 && <CustomMotionDiv className={styles.control}>
                <IconButton className={styles.iconButton} onClick={updateNewFlow}>
                    <ArrowCircleRightIcon className={styles.icon}/>
                </IconButton>
            </CustomMotionDiv>}
        </CustomMotionDiv>
    )
}

export default Properties;