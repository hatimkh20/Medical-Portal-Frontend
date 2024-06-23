import React, { useState } from "react";
import styles from "./SelectableList.module.css";

const SelectableList = ({ options, title }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault(); // Prevent form submission
    if (selectedOption && !selectedItems.includes(selectedOption)) {
      setSelectedItems([...selectedItems, selectedOption]);
      setSelectedOption(""); // Reset the dropdown
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
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
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleAddItem} className={styles.button}>
            Add {title}
          </button>
        </div>
      </div>
      <div>
        <div className={styles.title}>Selected Options</div>
        <div className={styles.list}>
          {selectedItems.length > 0 ? (
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
