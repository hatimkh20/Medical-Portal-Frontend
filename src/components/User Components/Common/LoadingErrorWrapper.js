import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoadingErrorWrapper.css';
import loadingGif from '../../../assets/images/loading.gif';

const LoadingErrorWrapper = ({ loading, error, children }) => {
  useEffect(() => {
    setTimeout(() => {
      if (error && error.message) {
        toast.error(`Error: ${error.message}`);
      }
    })
    
  }, [error, error?.message]);

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {children}
    </>
  );
};

LoadingErrorWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default LoadingErrorWrapper;
