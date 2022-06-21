import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😢</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>К Сожалению такая страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
