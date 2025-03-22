// components/Dashboard.js

import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faFileArrowDown,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../User Components/Common/util";
import LoadingErrorWrapper from "../User Components/Common/LoadingErrorWrapper";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import useDelete from "../../hooks/useDelete";
import usePatch from "../../hooks/usePatch";
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data: reports, loading, error, refetch } = useFetch("/api/report");
  const { deleteRequest, loading: deleting, error: deleteError } = useDelete();
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

  const redirectToForm = (id = "") => {
    navigate(`/form/${id}`);
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await deleteRequest(`/api/report/specific/${reportId}`);
      refetch();
    } catch (error) {
      alert(error || "Failed to delete report.");
    }
  };

  const handleViewArchiveReports = () => {
    navigate(`/archive-reports`);
  };

  const handleArchiveReport = async (reportId, updatedData) => {
    try {
      await patchRequest(
        `/api/report/specific/${reportId}/changeViewStatus`,
        updatedData
      );
      refetch();
    } catch (error) {
      alert(error || "Failed to archvie report.");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>{user ? `${user.first_name}'s DASHBOARD` : "DASHBOARD"}</div>
        <div>
          <button
            className="create-report-button"
            onClick={() => redirectToForm()}
          >
            Create Report
          </button>
          <button
            className="create-report-button"
            onClick={() => handleViewArchiveReports()}
          >
            <FontAwesomeIcon icon={faBoxArchive} />
            &nbsp; Archived
          </button>
        </div>
      </header>
      {/* <div className="archive-btn-div">
        <button className="create-report-button" onClick={() => handleViewArchiveReports()}><FontAwesomeIcon icon={faBoxArchive} />&nbsp; Archived</button>
      </div> */}
      <div className="reports-container">
        <div className="reports-header">
          <div className="reports-header-item">S.No</div>
          <div className="reports-header-item">Report Name</div>
          <div className="reports-header-item">Created Date</div>
          <div className="reports-header-item">Status</div>
          <div className="reports-header-item">Actions</div>
        </div>
        <LoadingErrorWrapper loading={loading} error={error}>
          <button
            className="action-button"
            onClick={() => redirectToForm("66b0f9572246523c585f6ca1")}
          >
            <FontAwesomeIcon icon={faEdit} />
            Default form for dev purpose
          </button>
          {reports &&
            reports.map((report, idx) => (
              <div className="report-row" key={report.id || idx}>
                <div className="report-item">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>
                <div className="report-item">{report.reportName}</div>
                <div className="report-item">
                  {formatDate(report.createdAt)}
                </div>
                <div className="report-item">
                  <span
                    className={`status-badge ${getStatusClass(report.status)}`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="report-item actions">
                  <button
                    className="action-button"
                    data-tooltip-id="view-tooltip"
                    data-tooltip-content="View Report"
                    onClick={() => handleViewReport(report._id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <Tooltip id="view-tooltip" />
                  </button>
                  <button
                    className="action-button"
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Edit Form"
                    onClick={() => redirectToForm(report._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <Tooltip id="edit-tooltip" />

                  </button>
                  {/* <button className="action-button">
                  <FontAwesomeIcon icon={faDownload} />
                </button> */}
                  <button
                    className="action-button"
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete Report"
                    onClick={() => handleDeleteReport(report._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <Tooltip id="delete-tooltip" />
                  </button>
                  <button
                    className="action-button"
                    data-tooltip-id="archive-tooltip"
                    data-tooltip-content="Archive Report"
                    onClick={() => handleArchiveReport(report._id)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    <Tooltip id="archive-tooltip" />
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
