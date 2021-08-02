import React from 'react';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        Created by John Sims
        <a href="https://github.com/simzeee" target="_blank">
        <img className={styles.headShot} src='https://avatars.githubusercontent.com/u/74082034?v=4' />
        </a>
      </div>
        {/* <div>Copyright 2021</div> */}
    </div>
  );
}
