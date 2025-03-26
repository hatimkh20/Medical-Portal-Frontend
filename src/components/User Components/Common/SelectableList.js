import React from "react";
import styles from "./SelectableList.module.css";
import InputField from "../Common/InputField";
import { titleCase, isOtherSelected } from "./util";
import { useField } from "formik";
import { traumaOptions } from "../MultiStepForm/Constants";
import SelectField from "./SelectField";

const SelectableList = ({
  options,
  title,
  selectedItems,
  handleAddItem,
  handleRemoveItem,
  values,
  handleChange,
  handleBlur,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [selectedOption, setSelectedOption] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    console.log(selectedOption);
    if (selectedOption === "Other") {
      handleAddItem(values[`other${titleCase(field.name)}`]);
    } else handleAddItem(selectedOption);
    setSelectedOption("");
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.controls}>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className={styles.select}
          >
            <option value="">Select {title}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {isOtherSelected(selectedOption) && (
          <div className={props.children && "input-group"}>
            <InputField
              name={`other${titleCase(field.name)}`}
              label={`Other ${title}, if you selected any other`}
              value={values && values[`other${titleCase(field.name)}`]}
              required={true}
              onChange={field.onChange}
              onBlur={props.onBlur}
            />
          </div>
        )}

        {/* Show detail input only for Anatomy */}
        {title === "Anatomy" && selectedOption && (
          <SelectField
            label="Trauma it caused"
            name={`${selectedOption}_trauma`}
            options={traumaOptions}
            value={values[`${selectedOption}_trauma`] || ""}
            values={values}
            otherHandleChange={handleChange}
            onBlur={handleBlur}
          />
        )}

        <div>
          <button onClick={handleAddButtonClick} className={styles.button}>
            Add {title}
          </button>
        </div>
      </div>
      <div>
        <div className={styles.title}>Selected Options</div>
        <div className={styles.list}>
          {selectedItems?.length > 0 ? (
            selectedItems.map((item, index) => (
              <div key={index} className={styles.item}>
                {item}
                <span
                  onClick={() => handleRemoveItem(item)}
                  className={styles.removeButton}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <div className={styles.noItems}>Please select any options</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableList;
