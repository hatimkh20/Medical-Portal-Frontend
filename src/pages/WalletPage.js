import React from 'react';
import './WalletPage.css';

const WalletPage = () => {
  return (
    <div className="wallet-page">
      <div className="wallet-container">
        <h1 className="wallet-heading">
          <i className="wallet-icon">💼</i> Your Wallet
        </h1>
        <p className="wallet-balance">Current Balance: $<span id="balance">0.00</span></p>
        <p className="wallet-info"><b>Doreen Medicals Limited</b> charge $5 for each report and you can topup as much as you want for later use. Your amount will be deducted according to the number of reports you download.</p>
        <div className="wallet-topup">
          <label htmlFor="amount">TOP UP YOUR WALLET NOW</label>
          <input type="number" id="amount" name="amount" placeholder="Enter amount" />
          <button type="button">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
