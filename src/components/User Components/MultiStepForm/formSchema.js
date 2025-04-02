// src/components/MultiStepForm/formSchema.js
import * as Yup from "yup";
import { toCamelCase, isPluralFrequencySelected } from "../Common/util";

export const ClaimantDetailsSchema = (values) => {
  return Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    dateOfBirth: Yup.string().required("Date Of Birth is required"),
    address: Yup.string().required("Address is required"),
    occupation: Yup.string().required("Occupation is required"),
    dateOfExamination: Yup.string().required("Date Of Examination is required"),
    whichRecordsSeen: Yup.string()
      .nullable()
      .when("medicalRecordsProvided", {
        is: "yes",
        then: (schema) =>
          schema.required("Which records were seen? is required"),
      }),
    dateOfAccident: Yup.string().required("Date Of Accident is required"),
    ageAtTimeOfAccident: Yup.string().nullable(), // Not required since it's auto-calculated
    whichTypeOfIDChecked: Yup.string().nullable(),
    accompaniedBy: Yup.string().required("Accompanied By is required"),
    placeOfExamination: Yup.string().required("Place Of Examination is required"),
    durationOfExamination: Yup.string().required("Duration Of Examination is required"),
    dateOfReport: Yup.string().required("Date Of Report is required"),
    instructingParty: Yup.string().required("Instructing Party is required"),
    instructingPartyRef: Yup.string().required("Instructing Party Ref is required"),
    agency: Yup.string().required("Agency is required"),
    agencyRef: Yup.string().required("Agency Ref is required"),
    medcoCaseNumber: Yup.string().required("Medco Case Number is required"),
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
      .min(1, "At least one anatomy must be selected")
      .required("Anatomy selection is required"),

    psychologicalInjuries: Yup.array()
      .min(1, "At least one psychological injury must be selected")
      .required("Psychological Injury selection is required"),
  });
};
const generateSymptomValidationSchema = (symptom) => {
  const fieldNamePrefix = `symptom_${toCamelCase(symptom.name)}_`; // Use symptom.name

  return {
    [`${fieldNamePrefix}startTime`]: Yup.string().required(
      "Start time is required"
    ),
    [`${fieldNamePrefix}severityOnset`]: Yup.string().required(
      "Severity at onset is required"
    ),
    [`${fieldNamePrefix}currentSeverity`]: Yup.string().required(
      "Current severity is required"
    ),
    [`${fieldNamePrefix}resolvedDuration`]: Yup.string().required(
      "Resolved duration is required"
    ),
  };
};

export const SymptomSectionValidationSchema = (values) => {
  console.log("SymptomSectionValidationSchema called with values:", values);

  const schemaFields = Object.values(values?.anatomy || {}).reduce(
    (acc, symptom) => ({
      ...acc,
      ...generateSymptomValidationSchema(symptom), // Pass the full object
    }),
    {}
  );

  console.log("Schema Fields");
  console.dir(schemaFields);

  return Yup.object().shape(schemaFields);
};


export const TreatmentValidationSchema = (values) => {
  const schemaShape = {};

  // Immediate Treatment
  schemaShape.serviceAtAccident = Yup.string().required(
    "Service at accident is required"
  );
  schemaShape.treatmentAtAccident = Yup.string().required(
    "Treatment at accident is required"
  );
  schemaShape.postLocationAccident = Yup.string().required(
    "Post location accident is required"
  );
  schemaShape.postLocationBy = Yup.string().required(
    "How you got there is required"
  );

  // Later Treatment
  schemaShape.laterTreatmentLocation = Yup.string().required(
    "Later treatment location is required"
  );
  schemaShape.treatmentTimeAfterAccident = Yup.string().required(
    "Time after accident is required"
  );
  schemaShape.receivedTreatment = Yup.string().required(
    "Medications received is required"
  );
  schemaShape.imagingOrScans = Yup.string().required(
    "Imaging or scans done is required"
  );

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
  schemaShape.currentEmployment = Yup.string().required(
    "Current employment or education is required"
  );
  schemaShape.hoursEmployment = Yup.string().required(
    "Hours spent on education/work is required"
  );
  schemaShape.durationTakenOffFromSchoolAfterAccident = Yup.string().required(
    "Duration taken off from school/work is required"
  );
  schemaShape.phasedReturnToSchoolManagement = Yup.string().required(
    "Phased return to school/work management is required"
  );

  return Yup.object().shape(schemaShape);
};

export const DomesticImpactListValidationSchema = (values) => {
  return Yup.object().shape({
    domesticLifeActivities: Yup.array()
      .min(1, "At least one domestic impact activity must be selected")
      .required("Domestic impact activities selection is required"),
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
      [`${fieldNamePrefix}_severityAtAccident`]: Yup.string().required(
        "Severity at the time of accident is required"
      ),
      [`${fieldNamePrefix}_currentCondition`]: Yup.string().required(
        "Current condition is required"
      ),
    };
  }, {});

  return Yup.object().shape(schemaFields);
};

export const MedicalHistorySchema = (values) => {
  // Define schema for each medical note

  // Define schema for MedicalHistory form
  return Yup.object().shape({
    pastMedicalInjuries: Yup.string().required(
      "Please provide details of past medical injuries"
    ),
    medicalNotes: Yup.array()
      .required("At least one medical note is required")
      .min(1, "At least one medical note is required"),
  });
};

export const ObservationSectionSchema = (values) => {
  return Yup.object().shape({
    eyeContact: Yup.string().required("Eye contact is required"),
    mentalState: Yup.string().required("Mental state is required"),
  });
};

export const PhysicalExaminationSectionSchema = (values) => {
  // Function to create schema for each anatomy entry
  const createSchemaForAnatomy = (anatomyName) =>
    Yup.object().shape({
      [`physicalExamination_${anatomyName}_palpation`]: Yup.string().required(
        "Palpation observation is required"
      ),
      [`physicalExamination_${anatomyName}_observation`]: Yup.string().required(
        "Observation is required"
      ),
    });

  // Iterate over anatomy objects and generate schema
  const schemas = Object.values(values.anatomy || {}).reduce((acc, { name }) => {
    return { ...acc, ...createSchemaForAnatomy(toCamelCase(name)).fields };
  }, {});

  // Return final Yup validation schema
  return Yup.object().shape(schemas);
};

export const DiagnosisValidationSchema = (values) => {
  const anatomySchema = Object.keys(values?.anatomy || {}).reduce((acc, item) => {
    const fieldNamePrefix = `physicalInjuriesDiagnosis_${toCamelCase(values.anatomy[item].name)}_`;
    const injuryName = `${fieldNamePrefix}injury`;
    const injuryOtherName = `${fieldNamePrefix}otherInjury`;
    const mechanismName = `${fieldNamePrefix}injuryMechanism`;

    acc[injuryName] = Yup.string().required("Please select an injury");

    acc[mechanismName] = Yup.string().required(
      "Please select a mechanism of injury"
    );

    if (values[injuryName] === "Other") {
      acc[injuryOtherName] = Yup.string().required(
        "Please provide details for the selected injury"
      );
    }

    return acc;
  }, {});

  const psychologicalSchema = values?.psychologicalInjuries?.reduce(
    (acc, item) => {
      const fieldNamePrefix = `psychologicalInjuriesDiagnosis_${toCamelCase(item)}_`;
      const mechanismName = `${fieldNamePrefix}injuryMechanism`;

      acc[mechanismName] = Yup.string().required(
        "Please select a mechanism of injury"
      );

      return acc;
    },
    {}
  );

  return Yup.object().shape({
    ...anatomySchema,
    ...psychologicalSchema,
  });
};

export const OpinionValidationSchema = (values) => {
  const validationSchema = Yup.object().shape({
    // Validating the anatomy-related fields dynamically based on the anatomy object
    ...Object.keys(values?.anatomy || {}).reduce((acc, item) => {
      const injuryName = `physicalInjuriesOpinion_${toCamelCase(values.anatomy[item].name)}_injuryOpinion`;
      acc[injuryName] = Yup.string()
        .required("Opinion about the physical injuries is required")
        .min(10, "Opinion must be at least 10 characters long");
      return acc;
    }, {}),

    // Validating the psychological injuries fields dynamically based on the values array
    ...values?.psychologicalInjuries?.reduce((acc, item) => {
      const injuryName = `psychologicalInjuriesOpinion_${toCamelCase(item)}_injuryOpinion`;
      acc[injuryName] = Yup.string()
        .required("Opinion about the psychological injuries is required")
        .min(10, "Opinion must be at least 10 characters long");
      return acc;
    }, {}),

    // Validating the "Anything else" field
    anythingElse: Yup.string().nullable(),
  });

  return validationSchema;
};


export const PrognosisValidationSchema = (values) => {
  const ongoingPrognosisQuestions = [
    "timeWillTakeToRecover",
    "severeDisability",
    "claimantRequireSpecialist",
    "specialist",
    "anyLongTermSequelae",
    "otherRecommendation",
    "treatmentAndRehabiliation",
  ];

  const resolvedPrognosisQuestions = [
    "whenDidItResolved",
    "whenDidItResolvedFrequency", // Add this field for frequency validation
    "anyLongTermSequelae",
  ];

  const createValidationSchemaForQuestions = (fieldPrefix, questions) => {
    const schema = {};
    questions.forEach((question) => {
      const field = fieldPrefix + question;
      if (question === "timeWillTakeToRecover") {
        schema[field] = Yup.string().required("Time to recover is required");
      } else if (question === "severeDisability") {
        schema[field] = Yup.string().required(
          "Severity of disability is required"
        );
      } else if (question === "claimantRequireSpecialist") {
        schema[field] = Yup.string().required(
          "Specialist recommendation is required"
        );
      } else if (question === "specialist") {
        schema[field] = Yup.string().required("Specialist field is required");
      } else if (question === "anyLongTermSequelae") {
        schema[field] = Yup.string().required(
          "Long-term sequelae status is required"
        );
      } else if (question === "otherRecommendation") {
        schema[field] = Yup.string().nullable();
      } else if (question === "treatmentAndRehabiliation") {
        schema[field] = Yup.string().min(
          10,
          "Treatment and rehabilitation must be at least 10 characters long"
        );
      } else if (question === "whenDidItResolved") {
        schema[field] = Yup.string().required("Resolution time is required");
        if (isPluralFrequencySelected(values[field])) {
          schema[`${fieldPrefix}whenDidItResolvedFrequency`] =
            Yup.string().required("Frequency is required");
        }
      }
    });
    return schema;
  };

  const physicalInjuriesSchema = Object.keys(values?.anatomy || {}).reduce(
    (acc, key) => {
      const anatomy = values.anatomy[key].name; // Assuming `name` is the key in the object
      const statusKey = `physicalInjuriesPrognosis_${toCamelCase(anatomy)}_resolvedOrOngoing`;
      const status = values[statusKey];
      const fieldPrefix = `physicalInjuriesDetailedPrognosis_${toCamelCase(anatomy)}_`;
      const questions =
        status === "Resolved"
          ? resolvedPrognosisQuestions
          : ongoingPrognosisQuestions;
      return {
        ...acc,
        ...createValidationSchemaForQuestions(fieldPrefix, questions),
      };
    },
    {}
  );
  const psychologicalInjuriesSchema = values?.psychologicalInjuries?.reduce(
    (acc, item) => {
      const statusKey = `psychologicalInjuriesPrognosis_${toCamelCase(
        item
      )}_resolvedOrOngoing`;
      const status = values[statusKey];
      const fieldPrefix = `psychologicalInjuriesDetailedPrognosis_${toCamelCase(
        item
      )}_`;
      const questions =
        status === "Resolved"
          ? resolvedPrognosisQuestions
          : ongoingPrognosisQuestions;
      return {
        ...acc,
        ...createValidationSchemaForQuestions(fieldPrefix, questions),
      };
    },
    {}
  );

  return Yup.object().shape({
    ...physicalInjuriesSchema,
    ...psychologicalInjuriesSchema,
  });
};

export const NullSchema = (values) => Yup.object().shape({});
