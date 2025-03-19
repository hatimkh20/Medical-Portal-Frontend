import React, { useState } from "react";
import SelectField from "../Common/SelectField";
import TextAreaField from "../Common/TextAreaField";
import Modal from "../Common/ModalComponent";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";
import usePost from "../../../hooks/usePost";
import useFetch from "../../../hooks/useFetch";

const StatementOfTruth = ({
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  prevStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: response,
    loading,
    error,
    postRequest: saveForm,
  } = usePost("/api/statement-of-truth", {
    headers: { "Content-Type": "application/json" },
  });

  const {
    data: statements,
    setData: setStatements,
    refetch,
  } = useFetch("/api/statement-of-truth");

  const handleSelectChange = (event) => {
    const statementName = event.target.value;

    const statement = statements.find(
      (statement) => statement.name === statementName
    );

    setFieldValue("selectedStatement", {
      // id: statement._id,
      name: statement.name,
      content: statement.statement,
    });
  };

  const saveStatement = async (e) => {
    if (!values.statementName || !values.statementContent) {
      return;
    }

    const newStatement = {
      name: values.statementName,
      statement: values.statementContent,
    };

    await saveForm(newStatement);

    // setStatements([...statements, newStatement])
    await refetch();

    setIsModalOpen(false);
  };

  return (
    <FormLayout
      title={
        <div className="title-with-button">
          <h2>STATEMENT OF TRUTH</h2>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={statements?.length === 0 ? "blink" : ""}
          >
            Add Statement In Library
          </Button>
        </div>
      }
    >
      <div className="input-group">
        <SelectField
          name="selectedStatement"
          label="Select predefined statement or from library"
          options={statements?.map((statement) => statement.name)}
          // optionValues={statements?.map(statement => statement._id)}
          value={values?.selectedStatement?.name}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          fullLine={true}
        />
      </div>

      {values.selectedStatement?.content && (
        <>
          <h4 className="form-sub-heading">Statement Preview</h4>
          <p>{values.selectedStatement.content}</p>
        </>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="EXPERT-DEFINED STATEMENT OF TRUTH"
        >
          <div className="form-group">
            <InputField
              name="statementName"
              label="Statement Name"
              value={values.statementName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group">
            <TextAreaField
              name="statementContent"
              label="Statement"
              rows={6}
              value={values.statementContent}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <Button type="button" onClick={saveStatement}>
            Add In Library
          </Button>
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
