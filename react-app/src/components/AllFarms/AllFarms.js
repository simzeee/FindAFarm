import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';

export default function AllFarms() {
  const dispatch = useDispatch();

  const farms = useSelector((state) => Object.values(state.farms));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllFarms());
    dispatch(getAllAmenities())
  }, [dispatch, farms.length]);

  if (!farms) return null;
  

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
        <div>
          <NavLink to="/createFarm">Share Your Farm</NavLink>
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
