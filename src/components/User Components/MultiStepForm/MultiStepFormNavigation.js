// import React, { useEffect, useState } from 'react';
// import './MultiStepFormNavigation.css'; // Import the CSS file for styles

// const MultiStepFormNavigation = ({ currentStep, totalSteps, onStepChange }) => {
//   const visibleStepsSize = 3;
//   const intitalVisibleSteps = [0, 1, 2];
  
//   const [visibleSteps, setVisibleSteps] = useState(intitalVisibleSteps); // Adjust visible range

//   const handleNext = () => {
//     if (visibleSteps[visibleSteps.length - 1] < totalSteps) {
//         setVisibleSteps(visibleSteps.filter(step => step + 3 <= totalSteps).map(step => step + 3));
//     }
//   };

//   const handlePrevious = () => {

//     if(visibleSteps.length < visibleStepsSize){
//         setVisibleSteps([visibleSteps[0]-3, visibleSteps[0]-2, visibleSteps[0]-1]);
//     }
//     else if (visibleSteps[0] > 0) {
//       setVisibleSteps(visibleSteps.filter(step => step - 3 >= 0).map(step => step - 3));
//     }
//   };

//   const handleJumpFromDropdown = (e) => {
//     const step = Number(e.target.value);
//     onStepChange(step);
//  }

//  const changeVisibleSteps = (step) => {
//     let newVisibleSteps = [];
//     newVisibleSteps[step%visibleStepsSize] = step;

//     while(newVisibleSteps[0] === undefined || newVisibleSteps[1] === undefined || newVisibleSteps[2] === undefined){

//         if(newVisibleSteps[2] === undefined && newVisibleSteps[1] !== undefined){
//             newVisibleSteps[2] = newVisibleSteps[1] + 1;
//         }

//         if(newVisibleSteps[1] === undefined && newVisibleSteps[0] !== undefined){
//             newVisibleSteps[1] = newVisibleSteps[0] + 1;
//         }

//         if(newVisibleSteps[0] === undefined && newVisibleSteps[2] !== undefined){
//             newVisibleSteps[0] = newVisibleSteps[2] - 2;
//         }

//         if(newVisibleSteps[0] === undefined && newVisibleSteps[1] !== undefined){
//             newVisibleSteps[0] = newVisibleSteps[1] - 1;
//         }
//     }

//     newVisibleSteps = newVisibleSteps.filter(step => step <= totalSteps);
//     setVisibleSteps(newVisibleSteps);
//  }

//  useEffect(() => {
//     changeVisibleSteps(currentStep);
//  }, [currentStep])

//   return (
//     <div className="multi-step-navigation">
//       <button className="nav-button" onClick={handlePrevious} disabled={visibleSteps[0] === 1}>
//         &lt;
//       </button>
      
//       {visibleSteps.map(step => (
//         <button
//           key={step}
//           onClick={() => onStepChange(step)}
//           className={`nav-button ${currentStep === step ? 'active' : ''}`}
//         >
//           {step}
//         </button>
//       ))}

//       <button className="nav-button" onClick={handleNext} disabled={visibleSteps[visibleSteps.length - 1] === totalSteps}>
//         &gt;
//       </button>
      
//       <select className="nav-dropdown" onChange={handleJumpFromDropdown} value={currentStep}>
//         {Array.from({ length: totalSteps+1 }, (_, i) => i).map(step => (
//           <option key={step} value={step}>
//             Page {step}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default MultiStepFormNavigation;




// Bilal work

import React from 'react';
import { useLocation } from 'react-router-dom';
import './MultiStepFormNavigation.css';

const MultiStepFormNavigation = ({ currentStep, totalSteps, onStepChange }) => {
  const location = useLocation();
  const path = location.pathname;

  // Condition 1: Check if URL is exactly "/form"
  const isFormOnly = path === "/form/";

  // Condition 2: Check if URL is "/form/{id}" using regex
  const hasIdInUrl = /^\/form\/[a-zA-Z0-9]+$/.test(path);

  const sectionLabels = {
    0: "Claimant Detail",
    1: "Vehicular Detail",
    2: "Accident Detail",
    3: "Anatomy",
    4: "Symptoms",
    5: "Treatment ",
    6: "Employment Education ",
    7: "Education ",
    8: "Domestic ",
    9: "Domestic Impact ",
    10: "Medical History ",
    11: "General Observation ",
    12: "Examination ",
    13: "Diagnosis ",
    14: "Opinion ",
    15: "Prognosis ",
    16: "Prognosis Detailed ",
    17: "Statement Of Truth ",
    18: "Expert Bibliography "
  };

  // Determine which steps to display
  let stepsToShow;
  if (isFormOnly && currentStep === 0) {
    stepsToShow = [0];
  } 
  else {
    stepsToShow = Array.from({ length: 19 }, (_, i) => i);
  }

  return (
    <div className="multi-step-navigation">
      <div className="step-buttons-container">
        {stepsToShow.map(step => (
          <button
            key={step}
            onClick={() => onStepChange(step)}
            className={`step-button ${currentStep === step ? 'active' : ''}`}
          >
            {sectionLabels[step]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiStepFormNavigation;
