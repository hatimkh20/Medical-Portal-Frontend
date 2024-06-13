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
  otherVehicleType: Yup.string().when('vehicleType', {
    is: 'Other',
    then: Yup.string().required("Other Vehicle Type is required"),
  }),
  // Add other fields here with validation
});
