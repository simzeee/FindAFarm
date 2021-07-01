import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneBooking } from '../../store/bookings';

export default function Booking() {
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const booking = useSelector((state) => state.bookings[bookingId]);

  useEffect(() => {
    dispatch(getOneBooking(bookingId));
  }, [bookingId]);

  if (!booking) return null;

  return (
    <div>
      <div>Start Date: {booking.start_day}</div>
      <div>End Date: {booking.end_day}</div>
      <div>Cost: {booking.cost_of_stay}</div>
      <div>Farm Name: {booking.name_of_farm}</div>
      <div><button>Edit Your Stay</button></div>
    </div>
  );
}
