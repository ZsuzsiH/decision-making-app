import sharedStyles from "../../../styles/shared.module.scss";
import CustomMotionDiv from "../../CustomMotionDiv/CustomMotionDiv";
import styles from "../Properties/Properties.module.scss";
import React, {useEffect, useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useAppSelector} from "../../../store/store";
import {IOption, IValue} from "../../../store/user/userTypes";
import Option from "./Option/Option";
import {saveDecisionFlow} from "../../../store/user/userAction";
import {useDispatch} from "react-redux";
import {setStep} from "../../../store/app/appAction";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const Options = () => {

    const dispatch = useDispatch();
    const flow = useAppSelector((state) => state.user.flow);

    const [options, setOptions] = useState<IOption[]>([]);
    const [properties, setProperties] = useState<IValue>();
    const [addNew, setAddNew] = useState<boolean>(false);
    const [editOption, setEditOption] = useState<number>();

    useEffect(() => {
        if (!flow) return;
        const values = flow.properties.map(item => item.name).reduce((acc: {[key:string]: 0}, cur) => {
            acc[cur] = 0
            return acc
        }, {});
        setProperties(() => values);
        if (!flow.options) return;
        setOptions(() => flow.options);
    }, [flow])

    const updateOptions = (option: IOption) => {
        const updatedOptions = [...options];
        const index = updatedOptions.findIndex(item => item.id === option?.id);
        if (index !== -1) updatedOptions[index] = option;
        else updatedOptions.push(option);

        setAddNew(() => false);
        setEditOption(() => undefined);
        if (!flow?.name) return;
        dispatch(saveDecisionFlow({...flow, options: updatedOptions}));
    }

    const proceedToNextStep = () => {
        dispatch(setStep(3))
    }

    return (
        <CustomMotionDiv className={sharedStyles.page}>
            <div className={sharedStyles.title}>Now let's set the options to choose from.</div>
            <div className={styles.subtitle}>Give a value to each criteria in the option.
            </div>
            {flow?.name && <CustomMotionDiv>
                <div className={styles.propertyList}>
                    {options?.length !== 0 && options.map((option, index) => (
                        <Option
                            key={index}
                            option={option}
                            onSave={updateOptions}
                            saved={editOption !== option.id}
                            onEdit={(id) => setEditOption(() => id)}
                        />
                    ))}
                    {addNew && properties && <Option
                        option={{id: options.length, name: '', values: properties}}
                        onSave={updateOptions}
                        saved={false}
                    />}
                    <CustomMotionDiv className={sharedStyles.addButton}>
                        <AddCircleIcon className={styles.addIcon} onClick={() => setAddNew(true)}/>
                    </CustomMotionDiv>
                </div>
            </CustomMotionDiv>}
            {flow && flow.options?.length >= 2 &&
                <CustomMotionDiv duration={2}>
                    <div className={styles.control}>
                        <IconButton className={sharedStyles.iconButton} onClick={proceedToNextStep}>
                            <div className={sharedStyles.text}>Show the results</div>
                            <ArrowCircleRightIcon className={sharedStyles.icon}/>
                        </IconButton>
                    </div>
                </CustomMotionDiv>
            }
        </CustomMotionDiv>
    )
}

export default Options;