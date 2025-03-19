import React, { useState } from "react";
import SelectField from "../Common/SelectField";
import TextAreaField from "../Common/TextAreaField";
import Modal from "../Common/ModalComponent";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import usePost from "../../../hooks/usePost";
import useFetch from "../../../hooks/useFetch";
import LoadingErrorWrapper from "../Common/LoadingErrorWrapper";
import "./Bibliography.css";

const Bibliography = ({
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  prevStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shakingTagId, setShakingTagId] = useState(null); // State for shaking tag

  const {
    data: response,
    loading: loadingOnSave,
    error: errorOnSave,
    postRequest: saveForm,
  } = usePost("/api/bibliography", {
    headers: { "Content-Type": "application/json" },
  });

  const {
    data: statements,
    setData: setStatements,
    refetch,
  } = useFetch("/api/bibliography");

  const handleSelectChange = (event) => {
    const selectedBibliographyId = event.target.value;

    if (!Array.isArray(values.selectedBibliographies)) {
      values.selectedBibliographies = [];
    }

    if (
      values.selectedBibliographies
        .map((bib) => bib.id)
        .includes(selectedBibliographyId)
    ) {
      setShakingTagId(selectedBibliographyId);
      setTimeout(() => setShakingTagId(null), 500);
      return;
    }

    const selectedBibliography = statements.find(
      (statement) => statement._id === selectedBibliographyId
    );

    setFieldValue("selectedBibliographies", [
      ...values.selectedBibliographies,
      {
        id: selectedBibliography._id,
        detail: selectedBibliography.detail,
      },
    ]);
  };

  const handleRemoveBibliography = (id) => {
    const updatedBibliographies = values.selectedBibliographies.filter(
      (bib) => bib.id !== id
    );
    setFieldValue("selectedBibliographies", updatedBibliographies);
  };

  const saveBibliography = async () => {
    if (!values.newBibiliography) {
      return;
    }

    const newBibiliography = {
      detail: values.newBibiliography,
    };

    await saveForm(newBibiliography);

    await refetch();
    // setStatements([...statements, newBibiliography]);

    setIsModalOpen(false);
  };

  return (
    <FormLayout
      title={
        <div className="title-with-button">
          <h2>EXPERT BIBLIOGRAPHY</h2>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={statements?.length === 0 ? "blink" : ""}
          >
            Add Bibliography In Library
          </Button>
        </div>
      }
    >
      <p className="form-description">You can select multiple bibliography</p>
      <div className="input-group">
        <SelectField
          name="userBibliography"
          label="Select Bibliographies"
          options={statements?.map((statement) => statement.detail)}
          optionValues={statements?.map((statement) => statement._id)}
          value={null}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          fullLine={true}
        />
      </div>

      <h4 className="form-sub-heading">Selected Bibliographies</h4>
      <div className="selected-bibliographies">
        {values.selectedBibliographies?.map((bib) => (
          <div
            key={bib.id}
            className={`bibliography-tag ${
              shakingTagId === bib.id ? "shake" : ""
            }`}
          >
            {bib.detail}
            <span
              className="remove-tag"
              onClick={() => handleRemoveBibliography(bib.id)}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="ADD BIBLIOGRAPHY"
        >
          <LoadingErrorWrapper loading={loadingOnSave}>
            <div className="form-group">
              <TextAreaField
                name="newBibiliography"
                label="Bibliography"
                rows={4}
                value={values.newBibiliography}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <Button type="button" onClick={saveBibliography}>
              Add In Bibliography
            </Button>
          </LoadingErrorWrapper>
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
