export const data = {
  claimantDetails: {
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    phone: "(123) 456-7890",
    dob: "01/01/1985",
    gender: "Male",
    occupation: "Software Engineer",
    gpName: "Dr. Jane Smith",
    gpAddress: "456 Health St, Anytown, USA",
    referrer: "XYZ Insurance",
    agencyReference: "ABC123",
    agencyAddress: "789 Agency Ave, Anytown, USA",
    solicitor: "John Q. Lawyer",
    solicitorAddress: "123 Legal Ln, Anytown, USA",
    dateOfExamination: "01/02/2021",
    durationOfExamination: "30 minutes",
    examinationVenue: "Anytown Hospital",
    reportDate: "01/03/2021",
    agency: "ABC Agency",
    caseNumber: "2100"
  },
  accidentDetails: {
    dateOfAccident: "01/01/2021",
    claimantResponse: "On the morning of 01/01/2021, the claimant's vehicle was stationary at a junction when it was rear-ended by a third-party vehicle traveling at a medium speed typical of city road conditions. The impact resulted in significant damage to the claimant's car. Notably, the vehicle was equipped with headrests and an airbag; however, the airbag did not deploy upon impact. The incident is currently under investigation for further assessment."
  },
  symptomsDetails: [
    { anatomy: "Head", severityOnset: "Mild", duration: "1 week", severityNow: "Mild", ongoing: "Yes" },
    { anatomy: "Back", severityOnset: "Moderate", duration: "2 weeks", severityNow: "Moderate", ongoing: "Yes" },
    { anatomy: "Neck", severityOnset: "Mild", duration: "1 week", severityNow: "Moderate", ongoing: "Yes" },
    { anatomy: "Shoulder", severityOnset: "Low", duration: "1 week", severityNow: "Mild", ongoing: "No" }
  ],
  treatmentDetails: [
    { treatment: "Physical Therapy", startDate: "01/10/2021", endDate: "02/10/2021", frequency: "Weekly", effectiveness: "Moderate" },
    { treatment: "Medication", startDate: "01/01/2021", endDate: "01/15/2021", medication: "Painkillers", dosage: "500mg", frequency: "Daily" }
  ],
  employmentEducationDetails: {
    employmentStatus: "Employed",
    occupation: "Software Engineer",
    educationLevel: "Bachelor's Degree",
    missedWorkDays: "5 days",
    impactOnWork: "Difficulty focusing due to pain and discomfort"
  },
  domesticImpactDetails: [
    { activity: "Cooking", severity: "Unable to perform", symptomExacerbation: "Yes" },
    { activity: "Cleaning", severity: "Limited ability", symptomExacerbation: "Yes" },
    { activity: "Shopping", severity: "Assistance required", symptomExacerbation: "Yes" }
  ],
  pastMedicalHistory: {
    injuries: "Past injuries: None",
    illnesses: "Past illnesses: None",
    operations: "Operations: Appendectomy (2015)"
  },
  generalObservation: {
    presentation: "Good",
    demeanor: "Cooperative",
    painLevels: "Moderate",
    painManagement: "Yes",
    mobility: "Normal"
  },
  physicalExamination: [
    { area: "Neck", observation: "Stiffness", characteristics: "Limited range of motion", symptomExacerbation: "Yes" },
    { area: "Back", observation: "Tenderness", characteristics: "Moderate pain on palpation", symptomExacerbation: "Yes" },
    { area: "Legs", observation: "Normal", characteristics: "No swelling or tenderness", symptomExacerbation: "No" }
  ],
  diagnosisPhysicalInjuries: [
    { injury: "Neck Strain", mechanism: "Whiplash", treatment: "Physical therapy and pain management", prognosis: "Full recovery expected" },
    { injury: "Lower Back Pain", mechanism: "Impact from collision", treatment: "Medication and physical therapy", prognosis: "Improvement over time" }
  ],
  diagnosisPsychologicalInjuries: [
    { injury: "Anxiety", mechanism: "Traumatic event", treatment: "Counseling and medication", prognosis: "Improvement with therapy" },
    { injury: "PTSD", mechanism: "Traumatic event", treatment: "Psychotherapy", prognosis: "Long-term management required" }
  ],
  opinion: "On the examination date, the claimant was still experiencing moderate pain and stiffness in the neck and back due to the accident. The prognosis for physical injuries is positive with expected improvement over time with continued treatment. Psychological symptoms, including anxiety and PTSD, will require ongoing management. The claimant is advised to continue physical therapy and seek psychological support.",
  prognosisPhysicalInjuries: [
    { injury: "Neck Strain", shortTerm: "3-6 months", longTerm: "Full recovery expected" },
    { injury: "Lower Back Pain", shortTerm: "6-12 months", longTerm: "Improvement expected with ongoing treatment" }
  ],
  prognosisPsychologicalInjuries: [
    { injury: "Anxiety", shortTerm: "3-6 months", longTerm: "Improvement with therapy" },
    { injury: "PTSD", shortTerm: "6-12 months", longTerm: "Long-term management required" }
  ],
  furtherTreatmentRehabilitation: "Continued physical therapy and psychological counseling are recommended to address ongoing symptoms and aid in recovery.",
  statementOfTruth: "I confirm that this report is a true and accurate reflection of the claimant's injuries and symptoms as observed during the examination. This report is prepared in accordance with the guidelines and requirements of the court.",
  signedBy: {
    name: "Dr. Jane Smith",
    qualifications: "MBBS, FRCS",
    signature: "Dr. Jane Smith",
    date: "01/03/2021"
  },
  expertBibliography: [
    "The Oxford Handbook of Accident and Emergency Medicine, 3rd edition, 2015",
    "Clinical Practice Guidelines in Trauma Management, 2nd edition, 2018",
    "Journal of Pain and Symptom Management, Volume 56, Issue 4, 2020"
  ]
};
