import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errorContents, errorType }) => {
  if (!errorContents) {
    return null;
  }

  const containerClass = errorType === 'final' ? styles.final_error_container : styles.error_container;

  return (
    <div className={containerClass}>
      <p>{errorContents}</p>
    </div>
  );
};

export default ErrorMessage;