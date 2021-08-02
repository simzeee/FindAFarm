import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styles from './NavBar.module.css'

import farmIcon from './farmIcon.png'

export default function NavBar(){

  const currentUser = useSelector((state)=>state.session.user)

  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.farmIconContainer}>
          <NavLink to="/" exact={true} activeClassName="active">
            <img className={styles.farmIcon} src={farmIcon}></img>
          </NavLink>
        </div>
      {/* <a href="https://github.com/simzeee/FindAFarm" target="_blank">John's Github</a> */}
        {!currentUser &&
        <div className={styles.loginContainer}>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>}
        {!currentUser && <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
       </div>}
        {/* <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div> */}
        {currentUser && <div>
          <NavLink to="/bookings" exact={true} activeClassName="active">
            Bookings
          </NavLink>
        </div>}
        <div>
          <NavLink to="/farms" exact={true} activeClassName="active">
            Farms
          </NavLink>
        </div>
        {!currentUser ? "" : <div>
          <LogoutButton />
        </div>}
      </div>
    </nav>
  );
};


