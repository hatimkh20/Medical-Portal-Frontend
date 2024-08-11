import React, { useState, useEffect } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, children, isOpenInitially = false}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  const toggleAccordion = (event) => {
    event.preventDefault();  // Prevents the default action
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(isOpenInitially);
  }, [isOpenInitially]);

  return (
    <div className={`${styles.accordionContainer}`}>
      <button className={`${styles.accordionTitle} ${isOpenInitially ? styles.errorBackground: ''}`} onClick={toggleAccordion}>
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
