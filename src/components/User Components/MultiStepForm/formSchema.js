// src/components/MultiStepForm/formSchema.js
import * as Yup from "yup";
import {anatomyList, domesticLifeActivities, presentSeverityOptions, psychologicalInjuries, sympt} from "./Constants";
import { toCamelCase } from "../Common/util";

export const ClaimantDetailsSchema = (values) => {
  return Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    dateOfBirth: Yup.date().required('Date Of Birth is required'),
    address: Yup.string().required('Address is required'),
    occupation: Yup.string().required('Occupation is required'),
    dateOfExamination: Yup.date().required('Date Of Examination is required'),
    whichRecordsSeen: Yup.string().required('Which records were seen? is required'),
    dateOfAccident: Yup.date().required('Date Of Accident is required'),
    ageAtTimeOfAccident: Yup.number()
      .required('Age at the time of accident is required')
      .positive()
      .integer(),
    whichTypeOfIDChecked: Yup.string().nullable(),
  });
};


export const AccidentDetailsSchema = (values) => {
  return Yup.object().shape({
    vehicleType: Yup.string().required("Vehicle Type is required"),
    otherVehicleType: Yup.string().nullable(),
    vehicleWheels: Yup.string().nullable(),
  });
};

export const AccidentSectionSchema = (values) => {
  return Yup.object().shape({
    accidentTime: Yup.string().required("Accident time is required"),
    accidentLocation: Yup.string().required("Accident location is required"),
    impactSpeed: Yup.string().required("Impact speed is required"),
    vehicleDamage: Yup.string().required("Vehicle damage is required"),
  });
};

export const AnatomySectionValidationSchema = (values) => {
  return Yup.object().shape({
    anatomy: Yup.array()
      .of(Yup.string().oneOf(anatomyList, 'Invalid anatomy selection'))
      .min(1, 'At least one anatomy must be selected')
      .required('Anatomy selection is required'),

    psychologicalInjuries: Yup.array()
      .of(Yup.string().oneOf(psychologicalInjuries, 'Invalid psychological injury selection'))
      .min(1, 'At least one psychological injury must be selected')
      .required('Psychological Injury selection is required'),
  });
};


const generateSymptomValidationSchema = (symptom) => {
  const fieldNamePrefix = `symptom_${toCamelCase(symptom)}_`;

  return {
    [`${fieldNamePrefix}startTime`]: Yup.string()
      .required('Start time is required'),
      
    [`${fieldNamePrefix}severityOnset`]: Yup.string()
      .required('Severity at onset is required'),

    [`${fieldNamePrefix}currentSeverity`]: Yup.string()
      .required('Current severity is required'),

    [`${fieldNamePrefix}resolvedDuration`]: Yup.string()
      .required("Current severity is required")
  };
};

export const SymptomSectionValidationSchema = (values) => {
  console.log("SymptomSectionValidationSchema called with values:", values);

  const schemaFields = values?.anatomy?.reduce((acc, symptom) => {
    return {
      ...acc,
      ...generateSymptomValidationSchema(symptom),
    };
  }, {});

  console.log("Schema Fields")
  console.dir(schemaFields)

  return Yup.object().shape({
    ...schemaFields,
  });
};

export const TreatmentValidationSchema = (values) => {
  const schemaShape = {};

  // Immediate Treatment
  schemaShape.serviceAtAccident = Yup.string().required('Service at accident is required');
  schemaShape.treatmentAtAccident = Yup.string().required('Treatment at accident is required');
  schemaShape.postLocationAccident = Yup.string().required('Post location accident is required');
  schemaShape.postLocationBy = Yup.string().required('How you got there is required');

  // Later Treatment
  schemaShape.laterTreatmentLocation = Yup.string().required('Later treatment location is required');
  schemaShape.treatmentTimeAfterAccident = Yup.string().required('Time after accident is required');
  schemaShape.receivedTreatment = Yup.string().required('Medications received is required');
  schemaShape.imagingOrScans = Yup.string().required('Imaging or scans done is required');

  return Yup.object().shape(schemaShape);
};

export const LivelihoodSectionSchema = (values) => {
  return Yup.object().shape({
    employmentStatus: Yup.string().required("Employment status is required"),
  });
};

export const EducationValidationSchema = (values) => {
  const schemaShape = {};

  // Validate fields dynamically based on the values
  schemaShape.currentEmployment = Yup.string().required('Current employment or education is required');
  schemaShape.hoursEmployment = Yup.string().required('Hours spent on education/work is required');
  schemaShape.durationTakenOffFromSchoolAfterAccident = Yup.string().required('Duration taken off from school/work is required');
  schemaShape.phasedReturnToSchoolManagement = Yup.string().required('Phased return to school/work management is required');

  return Yup.object().shape(schemaShape);
};

export const DomesticImpactListValidationSchema = (values) => {
  return Yup.object().shape({
    domesticLifeActivities: Yup.array()
      .of(Yup.string().oneOf(domesticLifeActivities, 'Invalid activity selection'))
      .min(1, 'At least one domestic impact activity must be selected')
      .required('Domestic impact activities selection is required')
  });
};

export const DomesticImpactValidationSchema = (values) => {
  // Extract symptoms (domesticLifeActivities) from values
  const symptoms = values.domesticLifeActivities || [];

  // Create validation schema based on the symptoms
  const schemaFields = symptoms.reduce((acc, symptom) => {
    const fieldNamePrefix = `domesticImpact_${toCamelCase(symptom)}`;
    return {
      ...acc,
      [`${fieldNamePrefix}_severityAtAccident`]: Yup.string()
        .required('Severity at the time of accident is required'),
      [`${fieldNamePrefix}_currentCondition`]: Yup.string()
        .required('Current condition is required')
    };
  }, {});

  return Yup.object().shape(schemaFields);
};

export const MedicalHistorySchema = (values) => {
  // Define schema for each medical note

  // Define schema for MedicalHistory form
  return Yup.object().shape({
    pastMedicalInjuries: Yup.string().required('Please provide details of past medical injuries'),
    medicalNotes: Yup.array().required('At least one medical note is required')
      .min(1, 'At least one medical note is required'),
  });
};

export const ObservationSectionSchema = (values) => {
  return Yup.object().shape({
    eyeContact: Yup.string().required('Eye contact is required'),
    mentalState: Yup.string().required('Mental state is required'),
  });
};

export const PhysicalExaminationSectionSchema = (values) => {
  // Dynamically create Yup validation schema based on the values
  const createSchemaForAnatomy = (anatomy) => Yup.object().shape({
    [`physicalExamination_${anatomy}_palpation`]: Yup.string().required('Palpation observation is required'),
    [`physicalExamination_${anatomy}_observation`]: Yup.string().required('Observation is required'),
  });

  // Create a schema for each anatomy item
  const schemas = values.anatomy.reduce((acc, item) => {
    return acc.concat(createSchemaForAnatomy(toCamelCase(item)));
  }, []);

  // Combine all schemas into a single schema
  return Yup.object().shape(schemas.reduce((acc, schema) => ({
    ...acc,
    ...schema.fields,
  }), {}));
};

export const NullSchema = (values) => Yup.object().shape({});
