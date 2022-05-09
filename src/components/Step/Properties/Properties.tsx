import React, {useEffect, useState} from "react";
import styles from "./Properties.module.scss";
import sharedStyles from "../../../styles/shared.module.scss";
import CustomMotionDiv from "../../CustomMotionDiv/CustomMotionDiv";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {saveDecisionFlow, startDecisionFlow} from "../../../store/user/userAction";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useAppSelector} from "../../../store/store";
import Property from "./components/Property/Property";
import { IProperty } from "../../../store/user/userTypes";
import { setStep } from "../../../store/app/appAction";

const Properties = () => {

    const dispatch = useDispatch();

    const flow = useAppSelector((state) => state.user.flow);

    const [properties, setProperties] = useState<IProperty[]>([]);
    const [addNew, setAddNew] = useState<boolean>(false);
    const [editProperty, setEditProperty] = useState<number>();
    const [name, setName] = useState<string>();

    const setFlowName = () => {
        if (!name) return;
        dispatch(startDecisionFlow(name));
    }

    useEffect(() => {
        if (!flow) return;
        setName(() => flow.name);
        setProperties(() => flow.properties);
    }, [flow])

    const updateProperties = (property: IProperty) => {
        const updatedProperties = [...properties];
        const index = updatedProperties.findIndex(item => item.id === property?.id);
        if (index !== -1) updatedProperties[index] = property;
        else updatedProperties.push(property);

        setAddNew(() => false);
        setEditProperty(() => undefined);
        dispatch(saveDecisionFlow({name, properties: updatedProperties}));
    }
    const proceedToNextStep = () => {
        dispatch(setStep(2))
    }

    return(
        <CustomMotionDiv className={sharedStyles.page}>
            <div className={sharedStyles.title}>Now let's set some criteria. Don't worry about it too much, you can always come back to make some changes.</div>
            <CustomMotionDiv className={styles.form}>
                <div className={styles.subtitle}>What will you name this decision flow?</div>
                <div>
                    <TextField
                        InputProps={{
                            className: styles.customInput,
                            endAdornment: (
                                <ArrowCircleRightIcon className={styles.fieldIcon} onClick={setFlowName}/>
                            )
                        }}
                        value={name||''}
                        variant="standard"
                        color={'secondary'}
                        onChange={(e) => setName(() => e.target.value)}
                    />
                </div>
            </CustomMotionDiv>
            {flow?.name && <CustomMotionDiv>
                <div className={styles.subtitle}>Now add some criteria</div>
                <div className={styles.propertyList}>
                    {properties?.length !== 0 && properties.map((property, index) => (
                        <Property
                            key={index}
                            property={property}
                            onSave={updateProperties}
                            saved={editProperty !== property.id}
                            onEdit={(id) => setEditProperty(() => id)}
                        />
                    ))}
                    {addNew && <Property
                        property={{id: properties.length, name: '', weight: 0, inverted: false}}
                        onSave={updateProperties}
                        saved={false}
                    />
                    }
                    <CustomMotionDiv className={sharedStyles.addButton}>
                        <AddCircleIcon className={styles.addIcon} onClick={() => setAddNew(true)}/>
                    </CustomMotionDiv>
                </div>

            </CustomMotionDiv>}
            {flow && flow.properties?.length >= 2 && <CustomMotionDiv className={styles.control}>
                <Button size={'large'} className={styles.button} onClick={proceedToNextStep} variant="contained">
                    Next
                </Button>
            </CustomMotionDiv>}
        </CustomMotionDiv>
    )
}

export default Properties;