import React, {useState} from 'react';
import s from './MultiSelect.module.css';
import Select from "react-select";
import makeAnimated from 'react-select/animated';

function MultiSelect(props) {
    //const [selectedOptions, setSelectedOptions] = useState();
    const optionList = props.optionList;

    // Function triggered on selection
    function handleSelect(data) {
        props.setSelectedOptions(data);
    }

    const animatedComponents = makeAnimated();

    return (
        <div className={s.selectContainer}>
            <div className={s.titleBox}><p className={s.title}>{props.title ?? ""}</p>
                {props.require ? <p title="Поле обязательно для ввода" className={s.required}>*</p> : <></>}
            </div>
            <Select
                options={optionList}
                placeholder=""
                value={props.selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                components={animatedComponents}
                isMulti
                blurInputOnSelect={true}

                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "rgb(99, 179, 237)" : "transparent",
                        // backgroundColor: "#343437",
                        backgroundColor: "#343437",
                        borderRadius: "6px",
                        fontFamily: "Bahnschrift",
                        minHeight: "2.5rem",
                        fontWeight: "600"
                    }),

                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        color: "#FFFFFF"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 0 : "rgb(99, 179, 237)",
                        backgroundColor: state.isFocused ? "#4e4e4e" : "#343437",
                        color: "#FFFFFF",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        borderRadius: "5px"
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 0 : "rgb(99, 179, 237)",
                        backgroundColor: state.isFocused ? "#4e4e4e" : "#343437",
                        color: "#FFFFFF",
                        borderRadius: "5px"
                    }),
                }}
            />
        </div>
    )
}

export default MultiSelect;