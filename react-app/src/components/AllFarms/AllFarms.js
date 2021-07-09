import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';

import styles from './AllFarms.module.css';

export default function AllFarms() {
  const dispatch = useDispatch();

  const farms = useSelector((state) => Object.values(state.farms));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllFarms());
    dispatch(getAllAmenities());
  }, [dispatch, farms.length]);

  if (!farms.length) return null;

  if (!currentUser) {
    return (
      <>
        <div>
          <h1>All Farms:</h1>
        </div>
        <div>
          {farms.map((farm) => (
            <NavLink to={`/farms/${farm.id}`} key={farm.id}>
              <div>{farm.name}</div>
            </NavLink>
          ))}
        </div>
      </>
    );
  } else if (currentUser.farmer) {
    return (
      <>
        <div className={styles.allFarmsTitle}>
          <h1>All Farms:</h1>
        </div>
        <div className={styles.allFarmsContainer}>
          {farms.map((farm) => (
            <div className={styles.farmImageContainer}>
              <NavLink to={`/farms/${farm.id}`} key={farm.id}>
                <img
                  className={styles.actualFarmImage}
                  src={farm.primaryImage}
                ></img>
              </NavLink>
            </div>
          ))}
        </div>
        <div className={styles.shareButton}>
          <button>
            <NavLink to="/createFarm">Share Your Farm</NavLink>
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h1>All Farms:</h1>
        </div>
        <div>
          {farms.map((farm) => (
            <NavLink to={`/farms/${farm.id}`} key={farm.id}>
              <div>{farm.name}</div>
            </NavLink>
          ))}
        </div>
      </>
    );
  }
}
