import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { formatDate } from "../User Components/Common/util";
import LoadingErrorWrapper from "../User Components/Common/LoadingErrorWrapper";
import useFetch from "../../hooks/useFetch";

const Dashboard = () => {

  const navigate = useNavigate()  // Create an instance of useHistory

  const { data: reports, loading, error } = useFetch('/api/report');

  const getStatusClass = (status) => {
    switch (status) {
      case "Viewed":
        return "status-viewed";
      case "Edited":
        return "status-edited";
      case "Downloaded":
        return "status-downloaded";
      default:
        return "";
    }
  };
  
  const redirectToForm = () => {
    navigate('/form');  // Use navigate method to change the route
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>DR IDORENYIN'S DASHBOARD</div>
        <button className="create-report-button" onClick={redirectToForm}>Create Report</button>
      </header>
      <div className="reports-container">
        <div className="reports-header">
          <div className="reports-header-item">S.No</div>
          <div className="reports-header-item">Report Name</div>
          <div className="reports-header-item">Created Date</div>
          <div className="reports-header-item">Status</div>
          <div className="reports-header-item">Actions</div>
        </div>
        <LoadingErrorWrapper loading={loading} error={error}>
        {reports && reports.map((report, idx) => (
          <div className="report-row" key={report.id}>
            <div className="report-item">
              {(idx+1).toString().padStart(2, "0")}
            </div>
            <div className="report-item">{report.report_name}</div>
            <div className="report-item">{formatDate(report.createdAt)}</div>
            <div className="report-item">
              <span className={`status-badge ${getStatusClass(report.status)}`}>
                {report.status}
              </span>
            </div>
            <div className="report-item actions">
              <button className="action-button">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="action-button">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="action-button">
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          </div>
        ))}
        </LoadingErrorWrapper>
      </div>
    </div>
  );
};

export default Dashboard;
