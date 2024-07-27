import React from 'react';
import './tableSection.css';

const TableSection = ({ title, rows, headerColor, mergedHeader }) => {
  return (
    <section className="report-section">
      {title && <h2 className="report-subtitle">{title}</h2>}
      <table className="report-table">
        <thead>
          {mergedHeader && (
            <tr>
              <th className='table-header' colSpan={Object.keys(rows[0]).length}>
                {mergedHeader}
              </th>
            </tr>
          )}
          <tr>
            {Object.keys(rows[0]).map((header, index) => (
              <th key={index} className={headerColor}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key, idx) => (
                <td key={idx} data-label={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableSection;
