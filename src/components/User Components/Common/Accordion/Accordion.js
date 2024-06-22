import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (event) => {
    event.preventDefault();  // Prevents the default action
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionContainer}>
      <button className={styles.accordionTitle} onClick={toggleAccordion}>
        {title} {isOpen ? '-' : '+'}
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
