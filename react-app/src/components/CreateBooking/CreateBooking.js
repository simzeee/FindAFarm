import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CreateBooking() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const updateStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const updateEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const updateNumberOfGuests = (e) => {
    setNumberOfGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // form values go here
    // userId, cost_of_stay, start_day, end_day, farmId, number of guests
    // farmId probably from props
    // Click on farm, then lead to CreateBooking component
    // redux stuff here
    console.log(startDate);
    console.log(endDate);
  };
  return (
    <>
      <div>
        <h3>Create Booking:</h3>
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="start">Check-In:</label>
        <input
          type="date"
          name="start_day"
          value={startDate}
          onChange={updateStartDate}
        ></input>
        <label htmlFor="end">Check-Out:</label>
        <input
          type="date"
          name="end_day"
          value={endDate}
          onChange={updateEndDate}
        ></input>
        <input
          type="number"
          name="number_of_guests"
          value={numberOfGuests}
          onChange={updateNumberOfGuests}
        ></input>
        <div>
          <button type="submit">Book</button>
        </div>
      </form>
    </>
  );
}
