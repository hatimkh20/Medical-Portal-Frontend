const makePayload = (step, formData, reportId) => {
    const report_name = "ahmed-report";

    if(!formData) return;

    // Define default values for each section
   
    // Return only the data relevant to the current step

    const getSpecificKeys = () => {
    switch (step) {
      case 0:
        return {
          report_name,
          current_report_section_status: "claimantDetails",
          claimantDetails: {
            full_name: formData.fullName || defaultData.claimantDetails.full_name,
            date_of_birth: formData.dateOfBirth || defaultData.claimantDetails.date_of_birth,
            address: formData.address || defaultData.claimantDetails.address,
            occupation: formData.occupation || defaultData.claimantDetails.occupation,
            type_of_id_checked: formData.whichTypeOfIDChecked || defaultData.claimantDetails.type_of_id_checked,
            date_of_examination: formData.dateOfExamination || defaultData.claimantDetails.date_of_examination,
            records_were_seen: formData.whichRecordsSeen || defaultData.claimantDetails.records_were_seen,
            date_of_accident: formData.dateOfAccident || defaultData.claimantDetails.date_of_accident,
            age_at_time_of_accident: formData.ageAtTimeOfAccident || defaultData.claimantDetails.age_at_time_of_accident,
            medical_reports_provided: formData.medicalRecordsProvided || defaultData.claimantDetails.medical_reports_provided,
            photo_id_confirmed: formData.hasPhotoIDConfirmed || defaultData.claimantDetails.photo_id_confirmed,
          }
        };
      case 1:
        return {
          
          report_name,
          current_report_section_status: "accidentDetails",
          accidentDetails: {
            vehicle_type: formData.vehicleType || defaultData.accidentDetails.vehicle_type,
            other_vehicle_type: formData.otherVehicleType || defaultData.accidentDetails.other_vehicle_type,
            vehicle_wheels: formData.vehicleWheels || defaultData.accidentDetails.vehicle_wheels,
          }
        };
      case 2:
        return {
          
          report_name,
          current_report_section_status: "accidentSection",
          accidentSection: {
            time_of_accident: formData.accidentTime || defaultData.accidentSection.time_of_accident,
            speed_of_impact: formData.impactSpeed || defaultData.accidentSection.speed_of_impact,
            accident_location: formData.accidentLocation || defaultData.accidentSection.accident_location,
            level_of_damage_vehicle: formData.vehicleLevelDamage || defaultData.accidentSection.level_of_damage_vehicle,
            details: (formData.accidentDetails || defaultData.accidentSection.details).map(detail => ({
              question: detail.question || defaultData.accidentSection.details[0].question,
              answer: detail.answer || defaultData.accidentSection.details[0].answer,
            })),
          }
        };
      case 3:
        return {
          
          report_name,
          current_report_section_status: "anatomySection",
          anatomySection: {
            anatomy_selected_options: formData.anatomy || defaultData.anatomySection.anatomy_selected_options,
            psychological_injuries_selected_options: formData.psychologicalInjuries || defaultData.anatomySection.psychological_injuries_selected_options,
          }
        };
      case 4:
        let symptoms = Object.entries(formData)
            .filter(elem => elem[0].startsWith("symptom_"))
            .reduce((map, elem) => {
                const splitted = elem[0].split("_");
                const symptonAnswer = elem[1];
                const sympton = splitted[1];
                const symptonAttr = splitted[2];
                if(!map.hasOwnProperty(sympton)){
                    map[sympton] = {};
                }
                
                map[sympton][symptonAttr] = symptonAnswer;
                
                return map;
            }, {})
        
        symptoms = Object.keys(symptoms).map(symptom=>{
         return { type: symptom, ...symptoms[symptom] }   
        })

        return {
          
          report_name,
          current_report_section_status: "symptomsSection",
          symptomsSection: {
            questions: (symptoms || defaultData.symptomsSection.questions).map(symptom => ({
              type: symptom.type || defaultData.symptomsSection.questions[0].type,
              symptoms_start: symptom.StartTime || defaultData.symptomsSection.questions[0].symptoms_start,
              severity_now: symptom.CurrentSeverity || defaultData.symptomsSection.questions[0].severity_now,
              severity_onset: symptom.SeverityOnset || defaultData.symptomsSection.questions[0].severity_onset,
              symptoms_resolved_duration: symptom.ResolvedDuration || defaultData.symptomsSection.questions[0].symptoms_resolved_duration,
            })),
          }
        };  
      case 5:
        return {
          report_name,
          current_report_section_status: "treatmentSection",
          treatmentSection: {
            immediate_treatment: {
              service_attended_scene_of_accident: formData.immediateServiceAttended,
              location_went_after_accident: formData.locationAfterAccident,
              treatment_received_at_scene_of_accident: formData.treatmentAtScene,
              how_get_there: formData.howGetThere,
            },
            later_treatment: {
              where_treatment_received: formData.whereTreatmentReceived,
              what_treatment_received: formData.whatTreatmentReceived,
              duration_of_treatment_received_after_accident: formData.durationTreatmentReceived,
              what_imaging_or_scans_done: formData.imagingOrScansDone,
            }
          }
        };
      case 6:
        return {
          report_name,
          current_report_section_status: "livehoodEducationSection",
          livehoodEducationSection: {
            employment_status: formData.employmentStatus,
          }
        };
      case 7:
        return {
          report_name,
          current_report_section_status: "employmentEducationSection",
          employmentEducationSection: {
            studying_where: formData.studyingWhere,
            duration_taken_off_from_school_after_accident: formData.durationTakenOff,
            hours_gave_to_education: formData.hoursGaveToEducation,
            phased_return_to_school_management: formData.phasedReturnToSchool,
          }
        };
      case 8:
        return {
          report_name,
          current_report_section_status: "domesticImpactSection",
          domesticImpactSection: {
            questions: formData.domesticImpactQuestions.map(question => ({
              type: question.type,
              severity_at_accident: question.severityAtAccident,
              current_condition: question.currentCondition,
            })),
          }
        };
      case 9:
        return {
          report_name,
          current_report_section_status: "medicalHistorySection",
          medicalHistorySection: {
            details_of_past_medical_injuries: formData.pastMedicalInjuries,
            medical_notes_reviewed: formData.medicalNotes.map(note => ({
              file_name: note.fileName,
              expert_review: note.expertReview,
            })),
          }
        };
      case 10:
        return {
          report_name,
          current_report_section_status: "generalObservationSection",
          generalObservationSection: {
            physical_appearance: formData.physicalAppearance,
            presence_of_bruises_scars_marks: formData.bruisesScarsMarks,
            holding_intelligent_conversation: formData.holdingIntelligentConversation,
            good_eye_contact: formData.goodEyeContact,
            mental_state: formData.mentalState,
          }
        };
      case 11:
        return {
          report_name,
          current_report_section_status: "physicalExaminationSection",
          physicalExaminationSection: {
            questions: formData.physicalExaminationQuestions.map(question => ({
              type: question.type,
              observation_of_palpation: question.observationOfPalpation,
              observation_on_flexios: question.observationOnFlexios,
            })),
          }
        };
      case 12:
        return {
          report_name,
          current_report_section_status: "diagnosisSection",
          diagnosisSection: {
            physical_injuries: {
              questions: formData.physicalInjuries.map(injury => ({
                type: injury.type,
                injury: injury.injury,
                mechanism_of_injury: injury.mechanismOfInjury,
                trauma_it_caused: injury.traumaItCaused,
              })),
            },
            psychological_injuries: {
              questions: formData.psychologicalInjuries.map(injury => ({
                type: injury.type,
                mechanism_of_injury: injury.mechanismOfInjury,
              })),
            }
          }
        };
      case 13:
        return {
          report_name,
          current_report_section_status: "opinionSection",
          opinionSection: {
            physical_injuries: {
              questions: formData.opinionPhysicalInjuries.map(opinion => ({
                type: opinion.type,
                opinion: opinion.opinion,
              })),
            },
            psychological_injuries: {
              questions: formData.opinionPsychologicalInjuries.map(opinion => ({
                type: opinion.type,
                opinion: opinion.opinion,
              })),
            },
            exceptional_circumstances: {
              claimant_claimed_any_exceptional_circumstance: formData.exceptionalCircumstanceClaimed,
              any_exceptional_circumstance_in_accident: formData.exceptionalCircumstanceInAccident,
              injuries_sustained_in_accident: formData.injuriesSustainedInAccident,
              in_agreement_as_medical_expert: formData.agreementAsMedicalExpert,
              injuries_result_of_exceptional_circumstance: formData.injuriesResultOfExceptionalCircumstance,
            }
          }
        };
      case 14:
        return {
          report_name,
          current_report_section_status: "prognosisSection",
          prognosisSection: {
            physical_injuries: {
              questions: formData.prognosisPhysicalInjuries.map(question => ({
                question: question.question,
                answer: question.answer,
              })),
            },
            psychological_injuries: {
              questions: formData.prognosisPsychologicalInjuries.map(question => ({
                question: question.question,
                answer: question.answer,
              })),
            }
          }
        };
      case 15:
        return {
          report_name,
          current_report_section_status: "prognosisDetailedSection",
          prognosisDetailedSection: {
            physical_injuries: {
              questions: formData.prognosisDetailedPhysicalInjuries.map(question => ({
                type: question.type,
                status: question.status,
                resolved_questions: question.resolvedQuestions,
                ongoing_questions: question.ongoingQuestions,
              })),
            },
            psychological_injuries: {
              questions: formData.prognosisDetailedPsychologicalInjuries.map(question => ({
                type: question.type,
                status: question.status,
                resolved_questions: question.resolvedQuestions,
                ongoing_questions: question.ongoingQuestions,
              })),
            }
          }
        };
      case 16:
        return {
          report_name,
          current_report_section_status: "statementOfTruthSection",
          statementOfTruthSection: {
            predefined_statement: {
              name: formData.statementName,
              statement: formData.statement,
            }
          }
        };
      case 17:
        return {
          report_name,
          current_report_section_status: "expertBibliographySection",
          expertBibliographySection: {
            selected_bibliography: formData.selectedBibliography.map(bib => ({
              bibliography: bib.bibliography,
            })),
          }
        };
      default:
        return {};
    }
  }

    return {
      report_id: reportId,
      ...getSpecificKeys()
    }
};

const defaultData = {
    report_name: 'Default Report Name',
    current_report_section_status: 'defaultStatus',
    claimantDetails: {
      full_name: 'John Doe',
      date_of_birth: '2000-01-01',
      address: '123 Default St',
      occupation: 'Unknown',
      type_of_id_checked: 'ID Card',
      date_of_examination: '2024-01-01',
      records_were_seen: 'Medical Records',
      date_of_accident: '2024-01-01',
      age_at_time_of_accident: 30,
      medical_reports_provided: 'yes',
      photo_id_confirmed: 'yes',
    },
    accidentDetails: {
      vehicle_type: 'Car',
      other_vehicle_type: 'N/A',
      vehicle_wheels: '4',
    },
    accidentSection: {
      time_of_accident: '12:00',
      speed_of_impact: 'Moderate',
      accident_location: 'Downtown',
      level_of_damage_vehicle: 'Minor',
      details: [{ question: 'Was the vehicle towed?', answer: 'yes' }],
    },
    anatomySection: {
      anatomy_selected_options: ['Head', 'Chest'],
      psychological_injuries_selected_options: ['Anxiety'],
    },
    symptomsSection: {
      questions: [{ type: 'Pain', symptoms_start: '2024-01-01', severity_now: 'Moderate', severity_onset: 'Severe', symptoms_resolved_duration: '2 weeks' }],
    },
    treatmentSection: {
      immediate_treatment: {
        service_attended_scene_of_accident: 'Emergency Services',
        location_went_after_accident: 'Hospital',
        treatment_received_at_scene_of_accident: 'First Aid',
        how_get_there: 'Ambulance',
      },
      later_treatment: {
        where_treatment_received: 'Clinic',
        what_treatment_received: 'X-Ray and Consultation',
        duration_of_treatment_received_after_accident: '1 month',
        what_imaging_or_scans_done: 'X-Ray',
      }
    },
    livehoodEducationSection: {
      employment_status: 'Employed',
    },
    employmentEducationSection: {
      studying_where: 'N/A',
      duration_taken_off_from_school_after_accident: '1 month',
      hours_gave_to_education: '0',
      phased_return_to_school_management: 'Full-time',
    },
    domesticImpactSection: {
      questions: [{ type: 'Daily Activities', severity_at_accident: 'Moderate', current_condition: 'Improving' }],
    },
    medicalHistorySection: {
      details_of_past_medical_injuries: 'No significant past injuries',
      medical_notes_reviewed: [{ file_name: 'Report1.pdf', expert_review: 'Reviewed' }],
    },
    generalObservationSection: {
      physical_appearance: 'Normal',
      presence_of_bruises_scars_marks: 'None',
      holding_intelligent_conversation: 'yes',
      good_eye_contact: 'yes',
      mental_state: 'Stable',
    },
    physicalExaminationSection: {
      questions: [{ type: 'Observation', observation_of_palpation: 'Normal', observation_on_flexios: 'Normal' }],
    },
    diagnosisSection: {
      physical_injuries: {
        questions: [{ type: 'Fracture', injury: 'Arm', mechanism_of_injury: 'Impact', trauma_it_caused: 'Pain' }],
      },
      psychological_injuries: {
        questions: [{ type: 'Anxiety', mechanism_of_injury: 'Stress' }],
      }
    },
    opinionSection: {
      physical_injuries: {
        questions: [{ type: 'Fracture', opinion: 'Recovery expected' }],
      },
      psychological_injuries: {
        questions: [{ type: 'Anxiety', opinion: 'Counseling recommended' }],
      },
      exceptional_circumstances: {
        claimant_claimed_any_exceptional_circumstance: 'No',
        any_exceptional_circumstance_in_accident: 'No',
        injuries_sustained_in_accident: 'Minor',
        in_agreement_as_medical_expert: 'yes',
        injuries_result_of_exceptional_circumstance: 'No',
      }
    },
    prognosisSection: {
      physical_injuries: {
        questions: [{ question: 'Recovery Time', answer: '6 weeks' }],
      },
      psychological_injuries: {
        questions: [{ question: 'Counseling', answer: 'Recommended' }],
      }
    },
    prognosisDetailedSection: {
      physical_injuries: {
        questions: [{ type: 'Fracture', status: 'Resolved', resolved_questions: { when_did_it_resolved: '2024-02-15', any_log_term_sequelae: 'No' }, ongoing_questions: { time_will_take_to_recover: '6 weeks', claimant_require_specialist: 'No', other_recommendation: 'Rest', severe_disability: 'No', specialist: 'N/A', any_log_term_sequelae: 'No', treatment_and_rehabilitation: 'Physical Therapy' } }],
      },
      psychological_injuries: {
        questions: [{ type: 'Anxiety', status: 'Ongoing', resolved_questions: { when_did_it_resolved: 'N/A', any_log_term_sequelae: 'Possible' }, ongoing_questions: { time_will_take_to_recover: 'Ongoing', recommend_checkup_specialist: 'yes', other_recommendation: 'Counseling', severe_disability: 'No', specialist: 'Psychologist', any_log_term_sequelae: 'Possible', treatment_and_rehabiliation: 'Counseling' } }],
      }
    },
    statementOfTruthSection: {
      predefined_statement: {
        name: 'Dr. Jane Smith',
        statement: 'The information provided is accurate to the best of my knowledge.',
      }
    },
    expertBibliographySection: {
      selected_bibliography: [{ bibliography: 'Expert Review Handbook' }],
    },
  };
  

export default makePayload;