import React from 'react';
import PropTypes from 'prop-types';
import './LoadingErrorWrapper.css'; // Optional: For custom styles
import loadingGif from '../../../assets/images/loading.gif'; // Adjust the path as needed

const LoadingErrorWrapper = ({ loading, error, children }) => {
  if (loading) {
    return <div className="loading">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
         </div>
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return <>{children}</>; // Render children if no loading or error
};

LoadingErrorWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default LoadingErrorWrapper;
