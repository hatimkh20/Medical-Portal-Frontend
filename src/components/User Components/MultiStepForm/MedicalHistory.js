import React, { useState } from "react";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import "./Form.css";
import "./MedicalHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const MedicalHistory = ({ values, setFieldValue, handleChange, handleBlur, prevStep }) => {
  const handleNoteChange = (index, field, value) => {
    const updatedNotes = [...values.medicalNotes];
    updatedNotes[index][field] = value;
    setFieldValue("medicalNotes", updatedNotes);
  };

  const addNote = () => {
    const updatedNotes = values.medicalNotes ? [...values.medicalNotes] : [];
    updatedNotes.push({ filename: "", expertReview: "" });
    setFieldValue("medicalNotes", updatedNotes);
  };

  const removeNote = (index) => {
    const updatedNotes = values.medicalNotes.filter((_, i) => i !== index);
    setFieldValue("medicalNotes", updatedNotes);
  };

  return (
    <FormLayout title="SECTION: RELEVANT MEDICAL HISTORY">
      <div className="form-group">
        <TextAreaField
          name="pastMedicalInjuries"
          label="Please provide details of past medical injuries that may have been impacted by the accident"
          value={values?.pastMedicalInjuries}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={2}
        />
      </div>

      <h2>SECTION: MEDICAL NOTES REVIEWED</h2>
      {values?.medicalNotes?.map((note, index) => (
        <div key={index} className="note-review-group input-group">
          <InputField
            name={`filename-${index}`}
            label="Filename"
            value={note.filename}
            onChange={(e) => handleNoteChange(index, "filename", e.target.value)}
          />
          <div className="expert-review-container">
            <button className="remove-note-btn" onClick={() => removeNote(index)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <TextAreaField
              name={`expertReview-${index}`}
              label="Expert Review"
              value={note.expertReview}
              onChange={(e) => handleNoteChange(index, "expertReview", e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className="add-filename-container">
        <Button type="button" className="add-filename-btn" onClick={addNote}>
          Add <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default MedicalHistory;
