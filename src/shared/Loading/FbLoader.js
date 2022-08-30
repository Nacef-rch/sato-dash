import React from 'react';
import styles from './FbLoader.module.css';
const FbLoader = () => {
  return (
    <div className={styles['lds-facebook']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default FbLoader;
