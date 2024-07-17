import React, { useState } from "react";
import SelectField from "../Common/SelectField";
import TextAreaField from "../Common/TextAreaField";
import Modal from "../Common/ModalComponent";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";

const Bibliography = ({ values, handleChange, handleBlur, prevStep }) => {
  const [statements, setStatements] = useState({
    "Statement 1":
      "I confirm that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I have expressed represent my true and complete professional opinions on the matters to which they refer.",
    // Initialize with more statements as necessary
  });
  const [selectedStatement, setSelectedStatement] = useState("Statement 1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedStatement(event.target.value);
  };

  const handleAddStatement = (name, text) => {
    if (name && text) {
      setStatements((prev) => ({ ...prev, [name]: text }));
      setIsModalOpen(false); // Close modal after adding
    }
  };

  return (
    <FormLayout
      title={
        <div className="title-with-button">
          <h2>EXPERT BIBLIOGRAPHY</h2>
          <Button type="button" onClick={() => setIsModalOpen(true)}>
          Add Bibliography In Library
          </Button>
        </div>
      }
    >
        <p className="form-description">
        You can select multiple bibliography
        </p>
      <div className="input-group">
        <SelectField
          name="userBibliography"
          label="Select Bibliographies"
          options={["Statement 1"]}
          value={values.userBibliography}
          onChange={handleChange}
          onBlur={handleBlur}
          fullLine={true}
        />
      </div>

      <h4 className="form-sub-heading">Statement Preview</h4>
      <p>{statements[selectedStatement]}</p>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="ADD BIBLIOGRAPHY"
        >
          
          <div className="form-group">
            <TextAreaField
              name="bibliography"
              label="Statement"
              rows={4}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <Button type="button">Add In Bibliography</Button>
        </Modal>
      )}

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Finish</Button>
      </div>
    </FormLayout>
  );
};

export default Bibliography;
