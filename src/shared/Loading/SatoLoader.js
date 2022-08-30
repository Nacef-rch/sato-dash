import React from 'react';
import styles from './SatoLoader.module.css';

const SatoLoader = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['top-left']}></div>
      <div className={styles['top-right']}></div>
      <div className={styles['bottom-left']}></div>
      <div className={styles['bottom-right']}></div>
    </div>
  );
};

export default SatoLoader;
