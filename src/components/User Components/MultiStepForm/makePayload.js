const makePayload = (step, formData, reportId) => {
    const reportName = "ahmed-report";

    if(!formData) return;

    // Define default values for each section

    // Return only the data relevant to the current step
    const getSpecificKeys = () => {
        switch (step) {
            case 0:
                return {
                    reportName,
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
                    reportName,
                    currentReportSectionStatus: "accidentDetails",
                    accidentDetails: {
                        vehicleType: formData.vehicleType || defaultData.accidentDetails.vehicleType,
                        otherVehicleType: formData.otherVehicleType || defaultData.accidentDetails.otherVehicleType,
                        vehicleWheels: formData.vehicleWheels || defaultData.accidentDetails.vehicleWheels,
                    }
                };
            case 2:
                return {
                    reportName,
                    currentReportSectionStatus: "accidentSection",
                    accidentSection: {
                        timeOfAccident: formData.accidentTime || defaultData.accidentSection.timeOfAccident,
                        speedOfImpact: formData.impactSpeed || defaultData.accidentSection.speedOfImpact,
                        accidentLocation: formData.accidentLocation || defaultData.accidentSection.accidentLocation,
                        levelOfDamageVehicle: formData.vehicleLevelDamage || defaultData.accidentSection.levelOfDamageVehicle,
                        details: (formData.accidentDetails || defaultData.accidentSection.details).map(detail => ({
                            question: detail.question || defaultData.accidentSection.details[0].question,
                            answer: detail.answer || defaultData.accidentSection.details[0].answer,
                        })),
                    }
                };
            case 3:
                return {
                    reportName,
                    currentReportSectionStatus: "anatomySection",
                    anatomySection: {
                        anatomySelectedOptions: formData.anatomy || defaultData.anatomySection.anatomySelectedOptions,
                        psychologicalInjuriesSelectedOptions: formData.psychologicalInjuries || defaultData.anatomySection.psychologicalInjuriesSelectedOptions,
                    }
                };
            case 4:
                let symptoms = Object.entries(formData)
                    .filter(elem => elem[0].startsWith("symptom_"))
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
                    return { type: symptom, ...symptoms[symptom] }   
                });

                return {
                    reportName,
                    currentReportSectionStatus: "symptomsSection",
                    symptomsSection: {
                        questions: (symptoms || defaultData.symptomsSection.questions).map(symptom => ({
                            type: symptom.type || defaultData.symptomsSection.questions[0].type,
                            symptomsStart: symptom.startTime || defaultData.symptomsSection.questions[0].symptomsStart,
                            severityNow: symptom.currentSeverity || defaultData.symptomsSection.questions[0].severityNow,
                            severityOnset: symptom.severityOnset || defaultData.symptomsSection.questions[0].severityOnset,
                            symptomsResolvedDuration: symptom.resolvedDuration || defaultData.symptomsSection.questions[0].symptomsResolvedDuration,
                        })),
                    }
                };
            case 5:
                return {
                    reportName,
                    currentReportSectionStatus: "treatmentSection",
                    treatmentSection: {
                        immediateTreatment: {
                            serviceAttendedSceneOfAccident: formData.immediateServiceAttended,
                            locationWentAfterAccident: formData.locationAfterAccident,
                            treatmentReceivedAtSceneOfAccident: formData.treatmentAtScene,
                            howGetThere: formData.howGetThere,
                        },
                        laterTreatment: {
                            whereTreatmentReceived: formData.whereTreatmentReceived,
                            whatTreatmentReceived: formData.whatTreatmentReceived,
                            durationOfTreatmentReceivedAfterAccident: formData.durationTreatmentReceived,
                            whatImagingOrScansDone: formData.imagingOrScansDone,
                        }
                    }
                };
            case 6:
                return {
                    reportName,
                    currentReportSectionStatus: "livehoodEducationSection",
                    livehoodEducationSection: {
                        employmentStatus: formData.employmentStatus,
                    }
                };
            case 7:
                return {
                    reportName,
                    currentReportSectionStatus: "employmentEducationSection",
                    employmentEducationSection: {
                        studyingWhere: formData.studyingWhere,
                        durationTakenOffFromSchoolAfterAccident: formData.durationTakenOff,
                        hoursGaveToEducation: formData.hoursGaveToEducation,
                        phasedReturnToSchoolManagement: formData.phasedReturnToSchool,
                    }
                };
            case 8:
                return {
                    reportName,
                    currentReportSectionStatus: "domesticImpactSection",
                    domesticImpactSection: {
                        questions: formData.domesticImpactQuestions.map(question => ({
                            type: question.type,
                            severityAtAccident: question.severityAtAccident,
                            currentCondition: question.currentCondition,
                        })),
                    }
                };
            case 9:
                return {
                    reportName,
                    currentReportSectionStatus: "medicalHistorySection",
                    medicalHistorySection: {
                        detailsOfPastMedicalInjuries: formData.pastMedicalInjuries,
                        medicalNotesReviewed: formData.medicalNotes.map(note => ({
                            fileName: note.fileName,
                            expertReview: note.expertReview,
                        })),
                    }
                };
            case 10:
                return {
                    reportName,
                    currentReportSectionStatus: "generalObservationSection",
                    generalObservationSection: {
                        physicalAppearance: formData.physicalAppearance,
                        presenceOfBruisesScarsMarks: formData.bruisesScarsMarks,
                        holdingIntelligentConversation: formData.holdingIntelligentConversation,
                        goodEyeContact: formData.goodEyeContact,
                        mentalState: formData.mentalState,
                    }
                };
            case 11:
                return {
                    reportName,
                    currentReportSectionStatus: "physicalExaminationSection",
                    physicalExaminationSection: {
                        questions: formData.physicalExaminationQuestions.map(question => ({
                            type: question.type,
                            observationOfPalpation: question.observationOfPalpation,
                            observationOnFlexios: question.observationOnFlexios,
                        })),
                    }
                };
            case 12:
                return {
                    reportName,
                    currentReportSectionStatus: "diagnosisSection",
                    diagnosisSection: {
                        physicalInjuries: {
                            questions: formData.physicalInjuries.map(injury => ({
                                type: injury.type,
                                injury: injury.injury,
                                mechanismOfInjury: injury.mechanismOfInjury,
                                traumaItCaused: injury.traumaItCaused,
                            })),
                        },
                        psychologicalInjuries: {
                            questions: formData.psychologicalInjuries.map(injury => ({
                                type: injury.type,
                                mechanismOfInjury: injury.mechanismOfInjury,
                            })),
                        }
                    }
                };
            case 13:
                return {
                    reportName,
                    currentReportSectionStatus: "opinionSection",
                    opinionSection: {
                        physicalInjuries: {
                            questions: formData.opinionPhysicalInjuries.map(opinion => ({
                                type: opinion.type,
                                opinion: opinion.opinion,
                            })),
                        },
                        psychologicalInjuries: {
                            questions: formData.opinionPsychologicalInjuries.map(opinion => ({
                                type: opinion.type,
                                opinion: opinion.opinion,
                            })),
                        },
                        exceptionalCircumstances: {
                            claimantClaimedAnyExceptionalCircumstance: formData.exceptionalCircumstanceClaimed,
                            anyExceptionalCircumstanceInAccident: formData.exceptionalCircumstanceInAccident,
                            injuriesSustainedInAccident: formData.injuriesSustainedInAccident,
                            inAgreementAsMedicalExpert: formData.agreementAsMedicalExpert,
                            injuriesResultOfExceptionalCircumstance: formData.injuriesResultOfExceptionalCircumstance,
                        }
                    }
                };
            case 14:
                return {
                    reportName,
                    currentReportSectionStatus: "prognosisSection",
                    prognosisSection: {
                        physicalInjuries: {
                            questions: formData.prognosisPhysicalInjuries.map(prognosis => ({
                                type: prognosis.type,
                                prognosis: prognosis.prognosis,
                            })),
                        },
                        psychologicalInjuries: {
                            questions: formData.prognosisPsychologicalInjuries.map(prognosis => ({
                                type: prognosis.type,
                                prognosis: prognosis.prognosis,
                            })),
                        }
                    }
                };
            default:
                return {};
        }
    };

    const payload = {
        report_id: reportId,
        reportName,
        currentReportSectionStatus: getSpecificKeys().currentReportSectionStatus,
        ...getSpecificKeys(),
    };

    return payload;
};


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