// components/ArchiveReport.js

import React, { useContext, useEffect, useState } from "react";
import "./ArchiveReport.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faDownload, faTrash, faFileArrowUp, faInbox } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../User Components/Common/util";
import LoadingErrorWrapper from "../User Components/Common/LoadingErrorWrapper";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from '../../context/AuthContext';
import usePatch from "../../hooks/usePatch";

const ArchiveReport = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data: reports, loading, error, refetch } = useFetch('/api/report?viewStatus=archive');
  const { patchRequest, loading: patching, error: patchError } = usePatch();

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "created":
        return "status-created";
      case "in_progress":
        return "status-in_progress";
      case "completed":
        return "status-completed";
      case "viewed":
        return "status-viewed";
      default:
        return "";
    }
  };

  const handleViewUnarchiveReports = () => {
    navigate(`/dashboard`);
  };

  const handleUnarchiveReport = async (reportId, updatedData) => {
    try {
      await patchRequest(`/api/report/specific/${reportId}/changeViewStatus`, updatedData);
      refetch();
    } catch (error) {
      alert(error || "Failed to archvie report.");
    }
  };

  return (
    <div className="archiveReport">
      <header className="archiveReport-header">
        <div>{user ? `${user.first_name}'s ARCHIVE REPORTS` : "ARCHIVE REPORTS"}</div>
        <button className="create-report-button" onClick={() => handleViewUnarchiveReports()}><FontAwesomeIcon icon={faInbox} /> &nbsp; Dashboard</button>
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
                <button className="action-button" onClick={() => handleUnarchiveReport(report._id)}>
                  <FontAwesomeIcon icon={faFileArrowUp} />
                </button>
              </div>
            </div>
          ))}
        </LoadingErrorWrapper>
      </div>
    </div>
  );
};

export default ArchiveReport;
