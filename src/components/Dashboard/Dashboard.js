// components/Dashboard.js

import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../User Components/Common/util";
import LoadingErrorWrapper from "../User Components/Common/LoadingErrorWrapper";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data: reports, loading, error } = useFetch('/api/report');

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "viewed":
        return "status-viewed";
      case "edited":
        return "status-edited";
      case "downloaded":
        return "status-downloaded";
      case "created":
        return "status-created";
      default:
        return "";
    }
  };

  const redirectToForm = () => {
    navigate('/form');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>{user ? `${user.first_name}'s DASHBOARD` : "DASHBOARD"}</div>
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
            <div className="report-row" key={report.id || idx}>
              <div className="report-item">
                {(idx + 1).toString().padStart(2, "0")}
              </div>
              <div className="report-item">{report.reportName}</div>
              <div className="report-item">{formatDate(report.createdAt)}</div>
              <div className="report-item">
                <span className={`status-badge ${getStatusClass(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="report-item actions">
              <button className="action-button" onClick={() => handleViewReport(report._id)}>
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
