import ClaimantDetails from "./ClaimantDetails";
import AccidentDetails from "./AccidentDetails";
import AccidentSectionForm from "./AccidentSection";
import AnatomySectionForm from "./AnatomySection";
import SymptomSectionForm from "./SymptomSectionForm";
import TreatmentSection from "./TreatmentSection";
import LivelihoodSection from "./LivelihoodSection";
import EducationSection from "./EducationSection";
import DomesticImpactList from "./DomesticImpactList";
import DomesticImpactSection from "./DomesticImpactSection";
import {
  ClaimantDetailsSchema,
  AccidentDetailsSchema,
  AccidentSectionSchema,
  AnatomySectionValidationSchema,
  SymptomSectionValidationSchema,
  TreatmentValidationSchema,
  LivelihoodSectionSchema,
  EducationValidationSchema,
  DomesticImpactListValidationSchema,
  DomesticImpactValidationSchema,
  MedicalHistorySchema,
  ObservationSectionSchema,
  PhysicalExaminationSectionSchema,
  DiagnosisValidationSchema,
  OpinionValidationSchema,
  PrognosisValidationSchema,
  NullSchema,
} from "./formSchema";
import MedicalHistory from "./MedicalHistory";
import ObservationSection from "./ObservationSection";
import PhysicalExaminationSection from "./PhysicalExaminationSection";
import DiagnosisSection from "./DiagnosisSection";
import OpinionSection from "./OpinionSection";
import PrognosisList from "./PrognosisList";
import PrognosisSection from "./PrognosisSection";
import StatementOfTruth from "./StatementOfTruth";
import Bibliography from "./BibliographySection";

const Steps = {
  values: [
    {
      component: ClaimantDetails,
      validationSchema: ClaimantDetailsSchema,
      identifier: 'claimantDetails'
    },
    {
      component: AccidentDetails,
      validationSchema: AccidentDetailsSchema,
      identifier: 'accidentDetails'
    },
    {
      component: AccidentSectionForm,
      validationSchema: AccidentSectionSchema,
      identifier: 'accidentSection'
    },
    {
      component: AnatomySectionForm,
      validationSchema: AnatomySectionValidationSchema,
      identifier: 'anatomySection'
    },
    {
      component: SymptomSectionForm,
      validationSchema: SymptomSectionValidationSchema,
      identifier: 'symptomsSection'
    },
    {
      component: TreatmentSection,
      validationSchema: TreatmentValidationSchema,
      identifier: 'treatmentSection'
    },
    {
      component: LivelihoodSection,
      validationSchema: LivelihoodSectionSchema,
      identifier: 'livehoodEducationSection'
    },
    {
      component: EducationSection,
      identifier: 'educationSection',
      validationSchema: EducationValidationSchema
    },
    {
      component: DomesticImpactList,
      identifier: 'domesticSection',
      validationSchema: DomesticImpactListValidationSchema
    },
    {
      component: DomesticImpactSection,
      identifier: 'domesticImpactSection',
      validationSchema: DomesticImpactValidationSchema
    },
    {
      component: MedicalHistory,
      identifier: 'medicalHistorySection',
      validationSchema: MedicalHistorySchema
    },
    {
      component: ObservationSection,
      identifier: 'generalObservationSection',
      validationSchema: ObservationSectionSchema
    },
    {
      component: PhysicalExaminationSection,
      identifier: 'physicalExaminationSection',
      validationSchema: PhysicalExaminationSectionSchema
    },
    {
      component: DiagnosisSection,
      identifier: 'diagnosisSection',
      validationSchema: DiagnosisValidationSchema
    },
    {
      component: OpinionSection,
      identifier: 'opinionSection',
      validationSchema: OpinionValidationSchema
    },
    {
      component: PrognosisList,
      identifier: 'prognosisSection',
      validationSchema: NullSchema
    },
    {
      component: PrognosisSection,
      identifier: 'prognosisDetailedSection',
      validationSchema: PrognosisValidationSchema
    },
    {
      component: StatementOfTruth,
      identifier: 'statementOfTruthSection',
      validationSchema: NullSchema
    },
    {
      component: Bibliography,
      identifier: 'expertBibliographySection',
      validationSchema: NullSchema
    }
  ],

  isValid(stepNumber) {
    return stepNumber < this.values.length;
  },

  getStepKey(stepNumber) {
    const step = this.values[stepNumber];
    return step ? step.identifier : null;
  },

  getStepComponent(stepNumber) {
    const step = this.values[stepNumber];
    return step ? step.component : null;
  },

  getStepValidationSchema(stepNumber) {
    const isValidationEnabled =
      process.env.REACT_APP_DISABLE_FORM_VALIDATION === "false";
    return isValidationEnabled
      ? this.values[stepNumber].validationSchema
      : NullSchema;
  },

  getCurrentStepByKey(identifier) {
    const stepIndex = this.values.findIndex(step => step.identifier === identifier);
    return stepIndex !== -1 ? stepIndex : 0;
  }
};

export default Steps;
