import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';
import { clearSearchResults } from '../../store/search';

import styles from './SearchResults.module.css';

export default function SearchResults() {
  const dispatch = useDispatch();
  const history = useHistory()

  const farms = useSelector((state) => Object.values(state.searchResults));
  const currentUser = useSelector((state) => state.session.user);

  let ids = farms.map((farm) => {
    return farm.id;
  });

  const clearSearch = () => {
    window.scrollTo(0,0);
    dispatch(clearSearchResults({ ids }));
  };

  useEffect(() => {
    dispatch(getAllFarms());
    dispatch(getAllAmenities());
  }, [dispatch, farms.length]);

  const returnHome = () => {

    dispatch(clearSearchResults({ ids }));
    history.push("/")
  };

  if (!farms.length)
    return (
      <div className={styles.noResultsContainer}>
        <img></img>
        <h2 id={styles.noResultsHeader}>
          We're sorry. No farms currently have those amenities
        </h2>
        <div className={styles.returnButton}>
          <button onClick={() => returnHome()}>Return to Home</button>
        </div>
      </div>
    );
  else {
    return (
      <>
        <div className={styles.allFarmsTitle}>
          <h1>Your Results:</h1>
        </div>
        <div className={styles.allFarmsContainer}>
          {farms.map((farm) => (
            <div className={styles.farmImageContainer}>
              <NavLink to={`/farms/${farm.id}`} key={farm.id}>
                <div className={styles.farmName} onClick={clearSearch}>
                  {farm.name}:
                </div>
                <img
                  onClick={clearSearch}
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
}
