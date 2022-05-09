import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./Properties.module.scss";
import sharedStyles from "../../../styles/shared.module.scss";
import CustomMotionDiv from "../../CustomMotionDiv/CustomMotionDiv";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {saveDecisionFlow, startDecisionFlow} from "../../../store/user/userAction";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useAppSelector} from "../../../store/store";
import Property from "./components/Property/Property";
import {IProperty} from "../../../store/user/userTypes";
import {setStep} from "../../../store/app/appAction";
import IconButton from "@mui/material/IconButton";
import useValidation from "../../../hooks/useValidation";

const Properties = () => {

    const dispatch = useDispatch();

    const flow = useAppSelector((state) => state.user.flow);
    const {validateName} = useValidation();

    const initialFormState = {name: flow?.name || ''};

    const [properties, setProperties] = useState<IProperty[]>([]);
    const [addNew, setAddNew] = useState<boolean>(false);
    const [editProperty, setEditProperty] = useState<number>();
    const [data, setData] = useState<{name: string}>(initialFormState);
    const [errors, setError] = useState<{[key:string]: string}>({});

    const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        setData((prev) => ({...prev, [target.name]: target.value}));
    }

    useEffect(() => {
        if (!flow) return;
        setProperties(() => flow.properties);
    }, [flow])

    const validateFields = (fields: {name: string}): boolean => {
        const errors = {name: validateName(fields.name) || ''}
        setError(() => errors)
        return !!errors.name;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateFields(data)) return;
        dispatch(startDecisionFlow(data.name));
    }

    const updateProperties = (property: IProperty) => {
        const updatedProperties = [...properties];
        const index = updatedProperties.findIndex(item => item.id === property?.id);
        if (index !== -1) updatedProperties[index] = property;
        else updatedProperties.push(property);

        setAddNew(() => false);
        setEditProperty(() => undefined);
        dispatch(saveDecisionFlow({name: data.name, properties: updatedProperties}));
    }
    const proceedToNextStep = () => {
        dispatch(setStep(2))
    }

    return (
        <CustomMotionDiv className={sharedStyles.page}>
            <div className={sharedStyles.title}>Now let's set some criteria.</div>
            <div className={styles.subtitle}>Don't worry about it too much, you can always come back to make some
                changes.
            </div>
            <CustomMotionDiv className={styles.form}>
                <div className={styles.subtitle}>What will you name this decision flow?</div>
                <div>
                    <TextField
                        InputProps={{
                            className: styles.customInput,
                            endAdornment: (
                                <IconButton className={sharedStyles.iconButton} onClick={handleSubmit}>
                                    <ArrowCircleRightIcon className={styles.fieldIcon}/>
                                </IconButton>
                            )
                        }}
                        value={data.name||''}
                        name='name'
                        variant="standard"
                        onChange={handleFieldChange}
                        error={!!errors.name}
                    />
                    <div className={sharedStyles.error}>{errors.name}</div>
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

            {flow && flow.properties?.length >= 2 &&
                <CustomMotionDiv duration={2}>
                    <div className={styles.control}>
                        <IconButton className={sharedStyles.iconButton} onClick={proceedToNextStep}>
                            <div className={sharedStyles.text}>Next step</div>
                            <ArrowCircleRightIcon className={sharedStyles.icon}/>
                        </IconButton>
                    </div>
                </CustomMotionDiv>
            }
        </CustomMotionDiv>
    )
}

export default Properties;