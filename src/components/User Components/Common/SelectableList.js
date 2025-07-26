import React, { useMemo } from "react";
import styles from "./SelectableList.module.css";
import InputField from "../Common/InputField";
import { titleCase, isOtherSelected, formatTraumaOther, getAnatomyOptions } from "./util";
import { useField } from "formik";
//import { traumaOptions } from "../MultiStepForm/Constants";
import traumaOptions from "../../../assets/data/traumaOptions.json";
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
  isAnatomy = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [selectedOption, setSelectedOption] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddButtonClick = (event) => {
    console.log("handleAddButtonClick", field);
    event.preventDefault();
    console.log(selectedOption, "selectedOption");
    console.log(values, "values");
    if (selectedOption === "Other") {
      console.log("In condition");
      handleAddItem(formatTraumaOther(values[`other${titleCase(field.name)}`]));
    } else handleAddItem(selectedOption);
    setSelectedOption("");
  };

  const filteredTraumaOptions = useMemo(() => {
    if (!selectedOption) return [];
      const { groupName } = getAnatomyOptions(selectedOption);
      const traumaGroup = traumaOptions.find(
      (item) => item.group?.toLowerCase().trim() === groupName?.toLowerCase().trim()
    );
  
    if (!traumaGroup) return ["Other"];
  
    // Normalize options and ensure "Other" is first
    const options = traumaGroup.traumaOptions.map(opt => opt.trim());
    return options.includes("Other")
      ? ["Other", ...options.filter(opt => opt.toLowerCase() !== "other")]
      : ["Other", ...options];
  }, [selectedOption, traumaOptions]);
  
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
              label={`Enter ${title}?`}
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
            label="Associated Injury/Trauma"
            name={`${selectedOption}_trauma`}
            options={filteredTraumaOptions}
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
        <div className={styles.list}>
          {selectedItems?.length > 0 ? (
            selectedItems.map((item, index) => (
              <div key={index} className={styles.item}>
                {isAnatomy ? `${item.name} - ${item.trauma}` : item}
                <span
                  onClick={() =>
                    isAnatomy
                      ? handleRemoveItem(item.name, item.trauma)
                      : handleRemoveItem(item)
                  }
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
