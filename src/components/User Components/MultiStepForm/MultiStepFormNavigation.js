import React, { useEffect, useState } from 'react';
import './MultiStepFormNavigation.css'; // Import the CSS file for styles

const MultiStepFormNavigation = ({ currentStep, totalSteps, onStepChange }) => {
  const visibleStepsSize = 3;
  const intitalVisibleSteps = [0, 1, 2];
  
  const [visibleSteps, setVisibleSteps] = useState(intitalVisibleSteps); // Adjust visible range

  const handleNext = () => {
    if (visibleSteps[visibleSteps.length - 1] < totalSteps) {
        setVisibleSteps(visibleSteps.filter(step => step + 3 <= totalSteps).map(step => step + 3));
    }
  };

  const handlePrevious = () => {

    if(visibleSteps.length < visibleStepsSize){
        setVisibleSteps([totalSteps-3, totalSteps-2, totalSteps-1]);
    }
    else if (visibleSteps[0] > 0) {
      setVisibleSteps(visibleSteps.filter(step => step - 3 >= 0).map(step => step - 3));
    }
  };

  const handleJumpFromDropdown = (e) => {
    const step = Number(e.target.value);
    onStepChange(step);
 }

 const changeVisibleSteps = (step) => {
    let newVisibleSteps = [];
    newVisibleSteps[step%visibleStepsSize] = step;

    while(newVisibleSteps[0] === undefined || newVisibleSteps[1] === undefined || newVisibleSteps[2] === undefined){

        if(newVisibleSteps[2] === undefined && newVisibleSteps[1] !== undefined){
            newVisibleSteps[2] = newVisibleSteps[1] + 1;
        }

        if(newVisibleSteps[1] === undefined && newVisibleSteps[0] !== undefined){
            newVisibleSteps[1] = newVisibleSteps[0] + 1;
        }

        if(newVisibleSteps[0] === undefined && newVisibleSteps[2] !== undefined){
            newVisibleSteps[0] = newVisibleSteps[2] - 2;
        }

        if(newVisibleSteps[0] === undefined && newVisibleSteps[1] !== undefined){
            newVisibleSteps[0] = newVisibleSteps[1] - 1;
        }
    }

    newVisibleSteps = newVisibleSteps.filter(step => step <= totalSteps);
    setVisibleSteps(newVisibleSteps);
 }

 useEffect(() => {
    changeVisibleSteps(currentStep);
 }, [currentStep])

  return (
    <div className="multi-step-navigation">
      <button className="nav-button" onClick={handlePrevious} disabled={visibleSteps[0] === 1}>
        &lt;
      </button>
      
      {visibleSteps.map(step => (
        <button
          key={step}
          onClick={() => onStepChange(step)}
          className={`nav-button ${currentStep === step ? 'active' : ''}`}
        >
          {step}
        </button>
      ))}

      <button className="nav-button" onClick={handleNext} disabled={visibleSteps[visibleSteps.length - 1] === totalSteps}>
        &gt;
      </button>
      
      <select className="nav-dropdown" onChange={handleJumpFromDropdown} value={currentStep}>
        {Array.from({ length: totalSteps+1 }, (_, i) => i).map(step => (
          <option key={step} value={step}>
            Page {step}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiStepFormNavigation;
