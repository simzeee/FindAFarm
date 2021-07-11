import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';
import { clearSearchResults } from '../../store/search';

import styles from './SearchResults.module.css'

export default function SearchResults() {
  const dispatch = useDispatch();

  const farms = useSelector((state) => Object.values(state.searchResults));
  const currentUser = useSelector((state) => state.session.user);

  let ids = farms.map((farm)=>{
    return farm.id
  })

  const clearSearch = () => {
    dispatch(clearSearchResults({ids}))
  }

  useEffect(() => {
    dispatch(getAllFarms());
    dispatch(getAllAmenities())
  }, [dispatch, farms.length]);

  if (!farms.length) return null;
  
    return (
      <>
        <div className={styles.allFarmsTitle}>
          <h1>Results</h1>
        </div>
        <div className={styles.allFarmsContainer}>
          {farms.map((farm) => (
          <div className={styles.farmImageContainer}>
            <NavLink to={`/farms/${farm.id}`} key={farm.id}>
              <div onClick={clearSearch}>{farm.name}</div>
            <img onClick={clearSearch}
                  className={styles.actualFarmImage}
                  src={farm.primaryImage}
                ></img>
            </NavLink>
            </div>
          ))}
        </div>
      </>
    );
}
