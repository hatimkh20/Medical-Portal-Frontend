// components/UsersPage.js

import React, { useContext, useEffect } from "react";
import "./TableView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const users =  [
    { id: '1', name: 'John Doe', createdAt: '2024-08-15', status: 'active' },
    { id: '2', name: 'Jane Smith', createdAt: '2024-08-14', status: 'inactive' },
    { id: '3', name: 'Sam Wilson', createdAt: '2024-08-13', status: 'active' },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  const redirectToForm = (id="") => {
    navigate(`/user-form/${id}`);
  };

  return (
    <div className="mainDiv">
      <header className="mainDiv-header">
        <div>All User</div>
        <button className="create-customTable-button" onClick={() => redirectToForm()}>Create User</button>
      </header>
      <div className="customTable-container">
        <div className="customTable-header">
          <div className="customTable-header-item">S.No</div>
          <div className="customTable-header-item">Name</div>
          <div className="customTable-header-item">Created Date</div>
          <div className="customTable-header-item">Status</div>
          <div className="customTable-header-item">Actions</div>
        </div>
          {users && users.map((user, idx) => (
            <div className="customTable-row" key={user.id || idx}>
              <div className="customTable-item">
                {(idx + 1).toString().padStart(2, "0")}
              </div>
              <div className="customTable-item">{user.name}</div>
              <div className="customTable-item">{user.createdAt}</div>
              <div className="customTable-item">
                <span className={`status-badge ${getStatusClass(user.status)}`}>
                  {user.status}
                </span>
              </div>
              <div className="customTable-item actions">
                <button className="action-button" onClick={() => redirectToForm(user.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
