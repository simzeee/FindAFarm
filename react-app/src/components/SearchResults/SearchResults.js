import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';
import { clearSearchResults } from '../../store/search';

export default function SearchResults() {
  const dispatch = useDispatch();

  const farms = useSelector((state) => Object.values(state.searchResults));
  const currentUser = useSelector((state) => state.session.user);

  let ids = farms.map((farm)=>{
    return farm.id
  })

  console.log("IDS ARE HERE", ids)

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
        <div>
          <h1>Results</h1>
        </div>
        <div>
          {farms.map((farm) => (
            <NavLink to={`/farms/${farm.id}`} key={farm.id}>
              <div onClick={clearSearch}>{farm.name}</div>
            </NavLink>
          ))}
        </div>
      </>
    );
}
