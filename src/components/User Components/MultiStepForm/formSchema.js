// src/components/MultiStepForm/formSchema.js
import * as Yup from "yup";

export const claimantDetailsSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  dateOfBirth: Yup.date().required('Date Of Birth is required'),
  address: Yup.string().required('Address is required'),
  occupation: Yup.string().required('Occupation is required'),
  dateOfExamination: Yup.date().required('Date Of Examination is required'),
  whichRecordsSeen: Yup.string().required('Which records were seen? is required'),
  //medicalRecordsProvided: Yup.string().required('This field is required'),
  //hasPhotoIDConfirmed: Yup.string().required('This field is required'),
  dateOfAccident: Yup.date().required('Date Of Accident is required'),
  ageAtTimeOfAccident: Yup.number().required('Age at the time of accident is required').positive().integer(),
  whichTypeOfIDChecked: Yup.string()
});

export const accidentDetailsSchema = Yup.object().shape({
  vehicleType: Yup.string().required("Vehicle Type is required"),
  otherVehicleType: Yup.string().nullable(),
  vehicleWheels: Yup.string().nullable()
});

// src/components/MultiStepForm/formSchema.js
export const accidentSectionSchema = Yup.object().shape({
  accidentTime: Yup.string().required("Accident time is required"),
  accidentLocation: Yup.string().required("Accident location is required"),
  impactSpeed: Yup.string().required("Impact speed is required"),
  vehicleDamage: Yup.string().required("Vehicle damage is required"),
  seatbeltFitted: Yup.boolean().required("This field is required"),
  seatbeltWorn: Yup.boolean().required("This field is required"),
  seatbeltException: Yup.boolean().required("This field is required"),
  airbagsFitted: Yup.boolean().required("This field is required"),
  airbagsDeploy: Yup.boolean().required("This field is required"),
});
