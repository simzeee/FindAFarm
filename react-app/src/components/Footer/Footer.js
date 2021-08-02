import React from 'react';

import styles from './Footer.module.css';
import linkedIn from './linkedIn.png';
import github from './github.png'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        Created by John Sims
        <a href="https://www.devjohnsims.com" target="_blank">
          <img
            className={styles.headShot}
            src="https://avatars.githubusercontent.com/u/74082034?v=4"
          />
        </a>
        <a href="https://www.linkedin.com/in/jwsims/" target="_blank">
          <img className={styles.linkedIn} src={linkedIn} />
        </a>
        <a href="https://github.com/simzeee" target="_blank">
          <img className={styles.github} src={github}/>
        </a>
      </div>
      {/* <div>Copyright 2021</div> */}
    </div>
  );
}
