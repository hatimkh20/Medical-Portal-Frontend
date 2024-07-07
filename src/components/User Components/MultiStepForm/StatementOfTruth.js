import React, { useState } from "react";
import SelectField from "../Common/SelectField";
import TextAreaField from "../Common/TextAreaField";
import Modal from "../Common/ModalComponent";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";

const StatementOfTruth = ({ values, handleChange, handleBlur, prevStep }) => {
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
          <h2>STATEMENT OF TRUTH</h2>
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            Add Statement In Library
          </Button>
        </div>
      }
    >
      <div className="input-group">
        <SelectField
          name="statements"
          label="Select predefined statement or  from library"
          options={["Statement 1"]}
          value=""
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
          title="EXPERT-DEFINED STATEMENT OF TRUTH"
        >
          <div className="form-group">
            <InputField
              name="statement"
              label="Statement Name"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group">
            <TextAreaField
              name="address"
              label="Statement"
              rows={6}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <Button type="button">Add In Library</Button>
        </Modal>
      )}

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default StatementOfTruth;
