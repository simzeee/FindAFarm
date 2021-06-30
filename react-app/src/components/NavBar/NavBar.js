import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav>
      <div className={styles.navContainer}>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>

          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
       </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div>
          <NavLink to="/bookings" exact={true} activeClassName="active">
            Bookings
          </NavLink>
        </div>
        <div>
          <NavLink to="/farms" exact={true} activeClassName="active">
            Farms
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
