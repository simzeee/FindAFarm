import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getOneBooking } from '../../store/bookings';

import styles from './Booking.module.css'

export default function Booking() {
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const booking = useSelector((state) => state.bookings[bookingId]);

  useEffect(() => {
    dispatch(getOneBooking(bookingId));
  }, [bookingId]);

  if (!booking) return null;

  return (
    <div className={styles.bookingsContainer}>
      <div>Start Date: {booking.startDate}</div>
      <div>End Date: {booking.endDate}</div>
      <div>Cost: {booking.costOfStay}</div>
      <div>Farm Name: {booking.nameOfFarm}</div>
      <div>
        <NavLink to={`/editBookings/${bookingId}`}>
        <button>Edit Your Stay</button>
        </NavLink>
    
        </div>

    </div>
  );
}
