// src/components/MultiStepForm/AnatomySectionForm.js
import React from "react";
import SelectableList from "../Common/SelectableList";
import Button from "../Common/Button";
import FormLayout from "../Common/FormLayout";
import { domesticLifeActivities } from "./Constants";

const DomesticImpactList = ({ values, handleChange, handleBlur, prevStep }) => {
  const handleAdd = (item) => {
    if (item && !values.domesticLifeActivities.includes(item)) {
      handleChange({
        target: {
          name: "domesticLifeActivities",
          value: [...values.domesticLifeActivities, item],
        },
      });
    }
  };

  const handleRemove = (item) => {
    handleChange({
      target: {
        name: "domesticLifeActivities",
        value: values.domesticLifeActivities.filter((domesticLifeActivities) => domesticLifeActivities !== item),
      },
    });
  };
  return (
    <FormLayout title=" DOMESTIC IMPACT">
      <SelectableList
        title="Activities of Daily Living"
        name="domesticLifeActivities"
        options={domesticLifeActivities}
        selectedItems={values.domesticLifeActivities}
        handleAddItem={handleAdd}
        handleRemoveItem={handleRemove}
        values={values}
      />
      <div className="button-group">
        <Button type="button" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="submit">Proceed to Next Step</Button>
      </div>
    </FormLayout>
  );
};

export default DomesticImpactList;
