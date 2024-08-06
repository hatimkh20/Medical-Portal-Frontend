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
      identifier: 'claimantDetails'
    },
    {
      component: AccidentDetails,
      validationSchema: accidentDetailsSchema,
      identifier: 'accidentDetails'
    },
    {
      component: AccidentSectionForm,
      identifier: 'accidentSection'
    },
    {
      component: AnatomySectionForm,
      identifier: 'anatomySection'
    },
    {
      component: SymptomSectionForm,
      identifier: 'symptomsSection'
    },
    {
      component: TreatmentSection,
      identifier: 'treatmentSection'
    },
    {
      component: LivelihoodSection,
      identifier: 'livelihoodSection'
    },
    {
      component: EducationSection,
      identifier: 'educationSection'
    },
    {
      component: DomesticImpactList,
      identifier: 'domesticImpactList'
    },
    {
      component: DomesticImpactSection,
      identifier: 'domesticImpactSection'
    },
    {
      component: MedicalHistory,
      identifier: 'medicalHistory'
    },
    {
      component: ObservationSection,
      identifier: 'observationSection'
    },
    {
      component: PhysicalExaminationSection,
      identifier: 'physicalExaminationSection'
    },
    {
      component: DiagnosisSection,
      identifier: 'diagnosisSection'
    },
    {
      component: OpinionSection,
      identifier: 'opinionSection'
    },
    {
      component: PrognosisList,
      identifier: 'prognosisSection'
    },
    {
      component: PrognosisSection,
      identifier: 'prognosisDetailedSection'
    },
    {
      component: StatementOfTruth,
      identifier: 'statementOfTruthSection'
    },
    {
      component: Bibliography,
      identifier: 'expertBibliographySection'
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
      : nullSchema;
  },

  getCurrentStepByKey(identifier) {
    const stepIndex = this.values.findIndex(step => step.identifier === identifier);
    return stepIndex !== -1 ? stepIndex : 0;
  }
};

export default Steps;
