// TableSection.js
import React from 'react';
import './tableSection.css';

const TableSection = ({ title, rows }) => {
  return (
    <section className="report-section">
      {title && <h2 className="report-subtitle">{title}</h2>}
      <table className="report-table">
        <thead>
          <tr>
            {Object.keys(rows[0]).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableSection;
