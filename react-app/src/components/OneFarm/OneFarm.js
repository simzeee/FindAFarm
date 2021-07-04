import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getOneFarm } from '../../store/farms';
import CreateBooking from '../CreateBooking/CreateBooking';

export default function Farm() {
  const dispatch = useDispatch();
  const { farmId } = useParams();

  const farm = useSelector((state) => state.farms[farmId]);
  const userId = useSelector((state) => state.session.user.id)
  const farmerId = useSelector((state) => state.farms[farmId].userId)
  


  // useEffect(() => {
  //   dispatch(getOneFarm(farmId));
  // }, [farmId]);

  // if (!farm) return null;

  return (
    <>
      <div>{farm.name}</div>
      <div>Price Per Day: ${farm.pricePerDay}</div>
      <div><img src={farm.primaryImage? farm.primaryImage:""}></img></div>
      <div>
        <CreateBooking></CreateBooking>
      </div>
      <div>{farmerId===userId? <NavLink to={`/editFarm/${farmId}`}>
      <button>Edit Your Farm</button>
      </NavLink>:"" }</div>
    </>
  );
}
