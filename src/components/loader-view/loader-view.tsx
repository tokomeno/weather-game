import React from 'react';
import styles from './styles.module.scss';
import Loader from 'react-loader-spinner';

interface Props {}

export const LoaderView: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <Loader type="Hearts" color="#00BFFF" height={100} width={100} />
    </div>
  );
};
