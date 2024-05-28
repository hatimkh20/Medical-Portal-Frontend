import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const reports = [
    {
      id: 1,
      name: "First Report Of the system",
      date: "09/03/2024",
      status: "Viewed",
    },
    {
      id: 2,
      name: "Second Report Of the system",
      date: "09/03/2024",
      status: "Edited",
    },
    {
      id: 3,
      name: "Third Report Of the system",
      date: "09/03/2024",
      status: "Downloaded",
    },
  ];

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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>DR IDORENYIN'S DASHBOARD</div>
        <button className="create-report-button">Create Report</button>
      </header>

      <div className="reports-container">
        <div className="reports-header">
          <div className="reports-header-item">S.No</div>
          <div className="reports-header-item">Report Name</div>
          <div className="reports-header-item">Created Date</div>
          <div className="reports-header-item">Status</div>
          <div className="reports-header-item">Actions</div>
        </div>
        {reports.map((report) => (
          <div className="report-row" key={report.id}>
            <div className="report-item">{report.id.toString().padStart(2, "0")}</div>
            <div className="report-item">{report.name}</div>
            <div className="report-item">{report.date}</div>
            <div className="report-item">
              <span className={`status-badge ${getStatusClass(report.status)}`}>
                {report.status}
              </span>
            </div>
            <div className="report-item actions">
              <button className="action-button">
                <i className="fas fa-eye"></i>
              </button>
              <button className="action-button">
                <i className="fas fa-edit"></i>
              </button>
              <button className="action-button">
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
