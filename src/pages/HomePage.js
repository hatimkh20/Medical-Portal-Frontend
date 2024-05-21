import React from 'react';
import './Homepage.css';
import doctorImage from '../assets/images/homepage.png'; // Adjust the path to your image

const HomePage = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="content">
          <h1 className="title">Reporting tool, made by Medical Experts for Experts</h1>
          <button className="register-button">Register Today</button>
        </div>
        <div className="image-container">
          <img src={doctorImage} alt="Medical Experts" className="image" />
        </div>
      </div>
      <section className="description">
        <div className="description-content">
          <h2>DOREEN MEDICALS LIMITED</h2>
          <p>
            Doreen Medicals Limited (DML) presents an innovative solution for doctors seeking efficient medico-legal report generation tool. Our intuitive software streamlines the process, allowing medical experts to create comprehensive reports swiftly and accurately. By simplifying the reporting process, Experts can produce quality and detailed reports tailored to their client's needs.
          </p>
          <p>
            With DML reporting tool, report generation becomes a seamless experience. Medical Experts can take direct control of their report generation. Our tool enables the Experts attend to their clients while simultaneously creating reports from their devices.
          </p>
          <p>
            The tool is designed for reporting simple and complex injuries, Medco and non-Medco reports.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
