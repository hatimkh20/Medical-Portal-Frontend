import { toCamelCase } from "../Common/util";

const makePayload = (step, formData, reportId) => {
    // const reportName = "ahmed-report";

    if(!formData) return;

    // Define default values for each section

    // Return only the data relevant to the current step
    const getSpecificKeys = () => {
        switch (step) {
            case 0:
                return {
                     
                    currentReportSectionStatus: "claimantDetails",
                    claimantDetails: {
                        fullName: formData.fullName || defaultData.claimantDetails.fullName,
                        dateOfBirth: formData.dateOfBirth || defaultData.claimantDetails.dateOfBirth,
                        address: formData.address || defaultData.claimantDetails.address,
                        occupation: formData.occupation || defaultData.claimantDetails.occupation,
                        typeOfIdChecked: formData.whichTypeOfIDChecked || defaultData.claimantDetails.typeOfIdChecked,
                        dateOfExamination: formData.dateOfExamination || defaultData.claimantDetails.dateOfExamination,
                        recordsWereSeen: formData.whichRecordsSeen || defaultData.claimantDetails.recordsWereSeen,
                        dateOfAccident: formData.dateOfAccident || defaultData.claimantDetails.dateOfAccident,
                        ageAtTimeOfAccident: formData.ageAtTimeOfAccident || defaultData.claimantDetails.ageAtTimeOfAccident,
                        medicalReportsProvided: formData.medicalRecordsProvided || defaultData.claimantDetails.medicalReportsProvided,
                        photoIdConfirmed: formData.hasPhotoIDConfirmed || defaultData.claimantDetails.photoIdConfirmed,
                    }
                };
            case 1:
                return {
                     
                    currentReportSectionStatus: "accidentDetails",
                    accidentDetails: {
                        vehicleType: formData.vehicleType || defaultData.accidentDetails.vehicleType,
                        otherVehicleType: formData.otherVehicleType || defaultData.accidentDetails.otherVehicleType,
                        vehicleWheels: formData.vehicleWheels || defaultData.accidentDetails.vehicleWheels,
                    }
                };
            case 2:
                

                return {
                     
                    currentReportSectionStatus: "accidentSection",
                    accidentSection: {
                        timeOfAccident: formData.accidentTime || defaultData.accidentSection.timeOfAccident,
                        speedOfImpact: formData.impactSpeed || defaultData.accidentSection.speedOfImpact,
                        accidentLocation: formData.accidentLocation || defaultData.accidentSection.accidentLocation,
                        levelOfDamageVehicle: formData.vehicleDamage || defaultData.accidentSection.levelOfDamageVehicle,
                        details: Object.keys(formData)
                        .filter((key) => key.startsWith("vehicleQuestion_"))
                        .map((key)=>{
                            return {
                                question: key,
                                answer: formData[key]
                            }    
                        })
                    }
                };
            case 3:
                return {
                     
                    currentReportSectionStatus: "anatomySection",
                    anatomySection: {
                        anatomySelectedOptions: formData.anatomy || defaultData.anatomySection.anatomySelectedOptions,
                        psychologicalInjuriesSelectedOptions: formData.psychologicalInjuries || defaultData.anatomySection.psychologicalInjuriesSelectedOptions,
                    }
                };
            case 4:
                const symptoms = groupRelatedQuestions(formData, 'symptom');

                return {
                     
                    currentReportSectionStatus: "symptomsSection",
                    symptomsSection: {
                        questions: (symptoms || defaultData.symptomsSection.questions).map(symptom => ({
                            type: symptom.type || defaultData.symptomsSection.questions[0].type,
                            symptomsStart: symptom.startTime || defaultData.symptomsSection.questions[0].symptomsStart,
                            severityNow: symptom.currentSeverity || defaultData.symptomsSection.questions[0].severityNow,
                            severityOnset: symptom.severityOnset || defaultData.symptomsSection.questions[0].severityOnset,
                            symptomsResolvedDuration: symptom.resolvedDuration || defaultData.symptomsSection.questions[0].symptomsResolvedDuration,
                            resolvedDurationFrequency: symptom.resolvedDurationFrequency
                        })),
                    }
                };
            case 5:
                return {
                     
                    currentReportSectionStatus: "treatmentSection",
                    treatmentSection: {
                        immediateTreatment: {
                            serviceAttendedSceneOfAccident: formData.serviceAtAccident,
                            locationWentAfterAccident: formData.postLocationAccident,
                            treatmentReceivedAtSceneOfAccident: formData.treatmentAtAccident,
                            otherServiceAttendedSceneOfAccident: formData.otherServiceAtAccident,
                            otherLocationWentAfterAccident: formData.otherPostLocationAccident,
                            otherTreatmentReceivedAtSceneOfAccident: formData.otherTreatmentAtAccident,
                            howGetThere: formData.postLocationBy,
                        },
                        laterTreatment: {
                            whereTreatmentReceived: formData.laterTreatmentLocation,
                            whatTreatmentReceived: formData.receivedTreatment,
                            durationOfTreatmentReceivedAfterAccident: formData.treatmentTimeAfterAccident,
                            whatImagingOrScansDone: formData.imagingOrScans,
                            otherWhereTreatmentReceived: formData.otherLaterTreatmentLocation,
                            otherWhatTreatmentReceived: formData.otherReceivedTreatment,
                            otherWhatImagingOrScansDone: formData.otherImagingOrScans,
                        }
                    }
                };
            case 6:
                return {
                     
                    currentReportSectionStatus: "livehoodEducationSection",
                    livehoodEducationSection: {
                        employmentStatus: formData.employmentStatus,
                        otherEmploymentStatus: formData.otherEmploymentStatus
                    }
                };
            case 7:
                return {
                     
                    currentReportSectionStatus: "employmentEducationSection",
                    employmentEducationSection: {
                        studyingWhere: formData.currentEmployment,
                        durationTakenOffFromSchoolAfterAccident: formData.durationTakenOffFromSchoolAfterAccident,
                        hoursGaveToEducation: formData.hoursEmployment,
                        phasedReturnToSchoolManagement: formData.phasedReturnToSchoolManagement,
                    }
                };
            case 8:
                return {
                     
                    currentReportSectionStatus: "domesticSection",
                    domesticSection: {
                        domesticImpactedAreas: formData.domesticLifeActivities
                    }
                };
            case 9:
                const domesticImpactQuestions = groupRelatedQuestions(formData, 'domesticImpact');
                
                console.log(domesticImpactQuestions, "domestic questions h");
                return {
                     
                    currentReportSectionStatus: "domesticImpactSection",
                    domesticImpactSection: {
                        questions: domesticImpactQuestions.map(question => ({
                            type: question.type,
                            severityAtAccident: question.severityAtAccident,
                            currentCondition: question.currentCondition,
                        })),
                    }
                };
            case 10:
                return {
                     
                    currentReportSectionStatus: "medicalHistorySection",
                    medicalHistorySection: {
                        detailsOfPastMedicalInjuries: formData.pastMedicalInjuries,
                        medicalNotesReviewed: formData.medicalNotes.map(note => ({
                            fileName: note.filename,
                            expertReview: note.expertReview,
                        })),
                    }
                };
            case 11:
                return {
                     
                    currentReportSectionStatus: "generalObservationSection",
                    generalObservationSection: {
                        physicalAppearance: formData.physicalAppearance,
                        otherPhysicalAppearance: formData.otherPhysicalAppearance,
                        presenceOfBruisesScarsMarks: formData.presenceOfScars,
                        otherPresenceOfBruisesScarsMarks: formData.otherPresenceOfScars,
                        holdingIntelligentConversation: formData.conversation,
                        otherHoldingIntelligentConversation:formData.otherConversation,
                        goodEyeContact: formData.eyeContact,
                        otherGoodEyeContact: formData.otherEyeContact,
                        mentalState: formData.mentalState,
                        otherMentalState: formData.otherMentalState,
                    }
                };
            case 12:
                const physicalExaminationQuestions = groupRelatedQuestions(formData, 'physicalExamination');
                return {
                     
                    currentReportSectionStatus: "physicalExaminationSection",
                    physicalExaminationSection: {
                        questions: physicalExaminationQuestions?.map(question => ({
                            type: question.type,
                            observationOfPalpation: question.palpation,
                            otherObservationOfPalpation: question.otherPalpation,
                            observationOnFlexios: question.observation,
                            otherObservationOnFlexios: question.otherObservation
                        })),
                    }
                };
            case 13:
                const physicalInjuriesDiagnosisQuestions = groupRelatedQuestions(formData, 'physicalInjuriesDiagnosis');
                const psychologicalInjuriesDiagnosisQuestions = groupRelatedQuestions(formData, 'psychologicalInjuriesDiagnosis');

                return {
                     
                    currentReportSectionStatus: "diagnosisSection",
                    diagnosisSection: {
                        physicalInjuries: {
                            questions: physicalInjuriesDiagnosisQuestions?.map(injury => ({
                                type: injury.type,
                                injury: injury.injury,
                                otherInjury: injury.otherInJury,
                                mechanismOfInjury: injury.injuryMechanism,
                                otherMechanismOfInjury: injury.otherInjuryMechanism,
                                traumaItCaused: injury.trauma,
                                otherTraumaItCaused: injury.otherTrauma
                            })),
                        },
                        psychologicalInjuries: {
                            questions: psychologicalInjuriesDiagnosisQuestions.map(injury => ({
                                type: injury.type,
                                mechanismOfInjury: injury.injuryMechanism,
                                otherMechanismOfInjury: injury.otherInjuryMechanism
                            })),
                        }
                    }
                };
            case 14:
                const physicalInjuriesOpinionQuestions = groupRelatedQuestions(formData, 'physicalInjuriesOpinion');
                const psychologicalInjuriesOpinionQuestions = groupRelatedQuestions(formData, 'psychologicalInjuriesOpinion');

                return {
                     
                    currentReportSectionStatus: "opinionSection",
                    opinionSection: {
                        physicalInjuries: {
                            questions: physicalInjuriesOpinionQuestions?.map(opinion => ({
                                type: toCamelCase(opinion.type),
                                opinion: opinion.injuryOpinion,
                            })),
                        },
                        psychologicalInjuries: {
                            questions: psychologicalInjuriesOpinionQuestions?.map(opinion => ({
                                type: toCamelCase(opinion.type),
                                opinion: opinion.injuryOpinion,
                            })),
                        },
                        exceptionalCircumstances: {
                            claimantClaimedAnyExceptionalCircumstance: formData.claimedExceptionalCircumstances,
                            anyExceptionalCircumstanceInAccident: formData.exceptionalCircumstancesInAccident,
                            injuriesSustainedInAccident: formData.injuriesExceptionallySevere,
                            inAgreementAsMedicalExpert: formData.agreementAsMedicalExpert,
                            injuriesResultOfExceptionalCircumstance: formData.injuriesResultOfExceptionalCircumstances,
                            anythingElse: formData.anythingElse
                        }
                    }
                };
            case 15:
                const prognosisPhysicalInjuries = groupRelatedQuestions(formData, 'physicalInjuriesPrognosis');
                const prognosisPsychologicalInjuries = groupRelatedQuestions(formData, 'psychologicalInjuriesPrognosis');


                return {
                     
                    currentReportSectionStatus: "prognosisSection",
                    prognosisSection: {
                        physicalInjuries: {
                            questions: prognosisPhysicalInjuries.map(prognosis => ({
                                question: `${prognosis.type}_resolvedOrOngoing`,
                                answer: prognosis.resolvedOrOngoing,
                            })),
                        },
                        psychologicalInjuries: {
                            questions: prognosisPsychologicalInjuries.map(prognosis => ({
                                question: `${prognosis.type}_resolvedOrOngoing`,
                                answer: prognosis.resolvedOrOngoing,
                            })),
                        }
                    }
                };
            case 16:
                
                const detailedPrognosisPhysicalInjuries = groupRelatedQuestions(formData, 'physicalInjuriesDetailedPrognosis');
                const detailedPrognosisPsychologicalInjuries = groupRelatedQuestions(formData, 'psychologicalInjuriesDetailedPrognosis');
                console.log("MAKING PAYLOAD FOR ", detailedPrognosisPhysicalInjuries)
                console.log(detailedPrognosisPsychologicalInjuries)
                return {
                     
                    currentReportSectionStatus: "prognosisDetailedSection",
                    prognosisDetailedSection: {
                        physicalInjuries: {
                            questions: detailedPrognosisPhysicalInjuries.map(prognosis => ({
                                type: prognosis.type,
                                whenDidItResolved: prognosis.whenDidItResolved,
                                timeWillTakeToRecover: prognosis.timeWillTakeToRecover,
                                claimantRequireSpecialist: prognosis.claimantRequireSpecialist,
                                otherRecommendation: prognosis.otherRecommendation,
                                severeDisability: prognosis.severeDisability,
                                specialist: prognosis.specialist,
                                otherSpecialist: prognosis.otherSpecialist,
                                anyLongTermSequelae: prognosis.anyLongTermSequelae,
                                treatmentAndRehabiliation: prognosis.treatmentAndRehabiliation
                                
                            })),
                        },
                        psychologicalInjuries: {
                            questions: detailedPrognosisPsychologicalInjuries.map(prognosis => ({
                                type: prognosis.type,
                                whenDidItResolved: prognosis.whenDidItResolved,
                                timeWillTakeToRecover: prognosis.timeWillTakeToRecover,
                                claimantRequireSpecialist: prognosis.claimantRequireSpecialist,
                                otherRecommendation: prognosis.otherRecommendation,
                                severeDisability: prognosis.severeDisability,
                                specialist: prognosis.specialist,
                                otherSpecialist: prognosis.otherSpecialist,
                                anyLongTermSequelae: prognosis.anyLongTermSequelae,
                                treatmentAndRehabiliation: prognosis.treatmentAndRehabiliation
                            })),
                        }
                    }
                };
            case 17: 
                return {
                    currentReportSectionStatus: "statementOfTruthSection",
                    statementOfTruthSection: {
                        predefinedStatement: {
                          id: formData.selectedStatement?.id,
                          name: formData.selectedStatement?.name,
                          statement: formData.selectedStatement?.content
                        }
                    },
                }
            case 18: 
                return {
                    currentReportSectionStatus: "expertBibliographySection",
                    expertBibliographySection: {
                        selectedBibliography: formData.selectedBibliographies?.map(selectedBibliography => {
                            return {
                                bibliography: selectedBibliography.detail
                            }
                        })
                    },
                }
            default:
                return {};
        }
    };

    const payload = {
        report_id: reportId,
         reportName: formData.fullName || defaultData.claimantDetails.fullName,
        currentReportSectionStatus: getSpecificKeys().currentReportSectionStatus,
        ...getSpecificKeys(),
    };

    return payload;
};

function groupRelatedQuestions(formData, sectionId) {
    let symptoms = Object.entries(formData)
        .filter(elem => elem[0].startsWith(`${sectionId}_`))
        .reduce((map, elem) => {
            const splitted = elem[0].split("_");
            const symptomAnswer = elem[1];
            const symptom = splitted[1];
            const symptomAttr = splitted[2];
            if (!map.hasOwnProperty(symptom)) {
                map[symptom] = {};
            }

            map[symptom][symptomAttr] = symptomAnswer;

            return map;
        }, {});

    symptoms = Object.keys(symptoms).map(symptom => {
        return { type: symptom, ...symptoms[symptom] };
    });
    return symptoms;
}

const defaultData = {
    reportName: 'Default Report Name',
    currentReportSectionStatus: 'defaultStatus',
    claimantDetails: {
        fullName: 'John Doe',
        dateOfBirth: '2000-01-01',
        address: '123 Default St',
        occupation: 'Unknown',
        typeOfIdChecked: 'ID Card',
        dateOfExamination: '2024-01-01',
        recordsWereSeen: 'Medical Records',
        dateOfAccident: '2024-01-01',
        ageAtTimeOfAccident: 30,
        medicalReportsProvided: 'yes',
        photoIdConfirmed: 'yes',
    },
    accidentDetails: {
        vehicleType: 'Car',
        otherVehicleType: 'N/A',
        vehicleWheels: '4',
    },
    accidentSection: {
        timeOfAccident: '12:00',
        speedOfImpact: 'Moderate',
        accidentLocation: 'Downtown',
        levelOfDamageVehicle: 'Minor',
        details: [{ question: 'Was the vehicle towed?', answer: 'yes' }],
    },
    anatomySection: {
        anatomySelectedOptions: ['Head', 'Chest'],
        psychologicalInjuriesSelectedOptions: ['Anxiety'],
    },
    symptomsSection: {
        questions: [{ type: 'Pain', symptomsStart: '2024-01-01', severityNow: 'Moderate', severityOnset: 'Severe', symptomsResolvedDuration: '2 weeks' }],
    },
    treatmentSection: {
        immediateTreatment: {
            serviceAttendedSceneOfAccident: 'Emergency Services',
            locationWentAfterAccident: 'Hospital',
            treatmentReceivedAtSceneOfAccident: 'First Aid',
            howGetThere: 'Ambulance',
        },
        laterTreatment: {
            whereTreatmentReceived: 'Clinic',
            whatTreatmentReceived: 'X-Ray and Consultation',
            durationOfTreatmentReceivedAfterAccident: '1 month',
            whatImagingOrScansDone: 'X-Ray',
        }
    },
    livehoodEducationSection: {
        employmentStatus: 'Employed',
    },
    employmentEducationSection: {
        studyingWhere: 'N/A',
        durationTakenOffFromSchoolAfterAccident: '1 month',
        hoursGaveToEducation: '0',
        phasedReturnToSchoolManagement: 'Full-time',
    },
    domesticImpactSection: {
        questions: [{ type: 'Daily Activities', severityAtAccident: 'Moderate', currentCondition: 'Improving' }],
    },
    medicalHistorySection: {
        detailsOfPastMedicalInjuries: 'No significant past injuries',
        medicalNotesReviewed: [{ fileName: 'Report1.pdf', expertReview: 'Reviewed' }],
    },
    generalObservationSection: {
        physicalAppearance: 'Normal',
        presenceOfBruisesScarsMarks: 'None',
        holdingIntelligentConversation: 'yes',
        goodEyeContact: 'yes',
        mentalState: 'Stable',
    },
    physicalExaminationSection: {
        questions: [{ type: 'Observation', observationOfPalpation: 'Normal', observationOnFlexios: 'Normal' }],
    },
    diagnosisSection: {
        physicalInjuries: {
            questions: [{ type: 'Fracture', injury: 'Arm', mechanismOfInjury: 'Impact', traumaItCaused: 'Pain' }],
        },
        psychologicalInjuries: {
            questions: [{ type: 'Anxiety', mechanismOfInjury: 'Stress' }],
        }
    },
    opinionSection: {
        physicalInjuries: {
            questions: [{ type: 'Fracture', opinion: 'Recovery expected' }],
        },
        psychologicalInjuries: {
            questions: [{ type: 'Anxiety', opinion: 'Counseling recommended' }],
        },
        exceptionalCircumstances: {
            claimantClaimedAnyExceptionalCircumstance: 'No',
            anyExceptionalCircumstanceInAccident: 'No',
            injuriesSustainedInAccident: 'Minor',
            inAgreementAsMedicalExpert: 'yes',
            injuriesResultOfExceptionalCircumstance: 'No',
        }
    },
    prognosisSection: {
        physicalInjuries: {
            questions: [{ question: 'Recovery Time', answer: '6 weeks' }],
        },
        psychologicalInjuries: {
            questions: [{ question: 'Counseling', answer: 'Recommended' }],
        }
    },
    prognosisDetailedSection: {
        physicalInjuries: {
            questions: [{ type: 'Fracture', status: 'Resolved', resolvedQuestions: { whenDidItResolved: '2024-02-15', anyLogTermSequelae: 'No' }, ongoingQuestions: { timeWillTakeToRecover: '6 weeks', claimantRequireSpecialist: 'No', otherRecommendation: 'Rest', severeDisability: 'No', specialist: 'N/A', anyLogTermSequelae: 'No', treatmentAndRehabilitation: 'Physical Therapy' } }],
        },
        psychologicalInjuries: {
            questions: [{ type: 'Anxiety', status: 'Ongoing', resolvedQuestions: { whenDidItResolved: 'N/A', anyLogTermSequelae: 'Possible' }, ongoingQuestions: { timeWillTakeToRecover: 'Ongoing', recommendCheckupSpecialist: 'yes', otherRecommendation: 'Counseling', severeDisability: 'No', specialist: 'Psychologist', anyLogTermSequelae: 'Possible', treatmentAndRehabilitation: 'Counseling' } }],
        }
    },
    statementOfTruthSection: {
        predefinedStatement: {
            name: 'Dr. Jane Smith',
            statement: 'The information provided is accurate to the best of my knowledge.',
        }
    },
    expertBibliographySection: {
        selectedBibliography: [{ bibliography: 'Expert Review Handbook' }],
    },
};

export default makePayload;
