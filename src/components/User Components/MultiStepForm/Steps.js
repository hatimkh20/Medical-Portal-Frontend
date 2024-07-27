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
  claimantDetailsSchema,
  accidentDetailsSchema,
  accidentSectionSchema,
  nullSchema,
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
      validationSchema: claimantDetailsSchema,
    },
    {
      component: AccidentDetails,
      validationSchema: accidentDetailsSchema,
    },
    {
      component: AccidentSectionForm,
      validationSchema: accidentSectionSchema,
    },
    {
      component: AnatomySectionForm,
      validationSchema: accidentSectionSchema,
    },
    {
      component: SymptomSectionForm,
    },
    {
      component: TreatmentSection,
    },
    {
      component: LivelihoodSection,
    },
    {
      component: EducationSection,
    },
    {
      component: DomesticImpactList,
    },
    {
      component: DomesticImpactSection,
    },
    {
      component: MedicalHistory
    },
    {
      component: ObservationSection
    },
    {
      component: PhysicalExaminationSection
    },
    {
      component: DiagnosisSection
    },
    {
      component: OpinionSection
    },
    {
      component: PrognosisList
    },
    {
      component: PrognosisSection
    },
    {
      component: StatementOfTruth,
    },
    {
      component: Bibliography
    }
  ],

  isValid(stepNumber){
    return stepNumber < this.values.length;
  },

  getStepKey(stepNumber) {
    const step = this.values[stepNumber];
    return step ? step.key : null; // Safely return the component or null if not found
  },

  getStepComponent(stepNumber) {
    const step = this.values[stepNumber];
    return step ? step.component : null; // Safely return the component or null if not found
  },

  getStepValidationSchema(stepNumber) {
    const isValidationEnabled =
      process.env.REACT_APP_DISABLE_FORM_VALIDATION === "false";
    return isValidationEnabled
      ? this.values[stepNumber].validationSchema
      : nullSchema;
  },
};

export default Steps;
