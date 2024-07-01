import React, { useState } from "react";
import Accordion from "../Common/Accordion/Accordion";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import InputField from "../Common/InputField";
import "../Common/Common.css";
import { observations, palpations } from "./Constants";

const PhysicalExaminationSection = ({ values, prevStep, nextStep }) => {
  const [selectedPalpations, setSelectedPalpations] = useState({});
  const [selectedObservations, setSelectedObservations] = useState({});

  const handlePalpationChange = (name, value) => {
    setSelectedPalpations({
      ...selectedPalpations,
      [name]: value,
    });
  };

  const handleObservationChange = (name, value) => {
    setSelectedObservations({
      ...selectedObservations,
      [name]: value,
    });
  };

  const renderAnatomyOnsets = (anatomy) => {
    const palpationName = `${anatomy}_palpation`;
    const palpationOtherName = `${anatomy}_palpation_other`;
    const observationName = `${anatomy}_observation`;
    const observationOtherName = `${anatomy}_observation_other`;

    return (
      <div>
        <div className="input-group">
          <SelectField
            label="Observations on Palpation"
            name={palpationName}
            options={palpations}
            value={values[palpationName]}
            onChange={(e) => handlePalpationChange(palpationName, e.target.value)}
          />
          {selectedPalpations[palpationName] === "Other" && (
            <InputField
              label="Please fill, if selected other (optional)"
              name={palpationOtherName}
              value={values[palpationOtherName]}
            />
          )}
        </div>
        <div className="input-group">
          <SelectField
            label="Observations on flexion/ extension or abduction"
            name={observationName}
            options={observations}
            value={values[observationName]}
            onChange={(e) => handleObservationChange(observationName, e.target.value)}
          />
          {selectedObservations[observationName] === "Other" && (
            <InputField
              label="Please fill, if selected other (optional)"
              name={observationOtherName}
              value={values[observationOtherName]}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <FormLayout title="SECTION: PHYSICAL EXAMINATION">
      <p className="form-description">
        Now, you have to add the onset and severity of the selected physical examination
      </p>
      {values?.anatomy?.map((item) => (
        <Accordion key={item} title={item}>
          {renderAnatomyOnsets(item)}
        </Accordion>
      ))}
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit" onClick={nextStep}>
          Proceed to Next Step
        </Button>
      </div>
    </FormLayout>
  );
};

export default PhysicalExaminationSection;
