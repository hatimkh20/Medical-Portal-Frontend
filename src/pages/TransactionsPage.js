// components/TransactionsPage.js

import React, { useContext, useEffect } from "react";
import "./TableView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const TransactionsPage = () => {
  const navigate = useNavigate();
  const transactions =  [
    { id: '1', name: 'Transaction 1', createdAt: '2024-08-15', status: 'complete' },
    { id: '2', name: 'Transaction 2', createdAt: '2024-08-14', status: 'incomplete' },
    { id: '3', name: 'Transaction 3', createdAt: '2024-08-13', status: 'complete' },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "status-complete";
      case "incomplete":
        return "status-incomplete";
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
        <div>All Transactions</div>
      </header>
      <div className="customTable-container">
        <div className="customTable-header">
          <div className="customTable-header-item">S.No</div>
          <div className="customTable-header-item">Name</div>
          <div className="customTable-header-item">Created Date</div>
          <div className="customTable-header-item">Status</div>
          <div className="customTable-header-item">Actions</div>
        </div>
          {transactions && transactions.map((transaction, idx) => (
            <div className="customTable-row" key={transaction.id || idx}>
              <div className="customTable-item">
                {(idx + 1).toString().padStart(2, "0")}
              </div>
              <div className="customTable-item">{transaction.name}</div>
              <div className="customTable-item">{transaction.createdAt}</div>
              <div className="customTable-item">
                <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
              <div className="customTable-item actions">
                <button className="action-button" onClick={() => redirectToForm(transaction.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
