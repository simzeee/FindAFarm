import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getOneFarm } from '../../store/farms';
import CreateBooking from '../CreateBooking/CreateBooking';

export default function Farm() {
  const dispatch = useDispatch();
  const { farmId } = useParams();

  const farm = useSelector((state) => state.farms[farmId]);
  

  useEffect(() => {
    dispatch(getOneFarm(farmId));
  }, [farmId]);

  if (!farm) return null;

  return (
    <>
      <div>{farm.name}</div>
      <div>Price Per Day: ${farm.price_per_day}</div>
      <div>
        <CreateBooking></CreateBooking>
      </div>
    </>
  );
}
