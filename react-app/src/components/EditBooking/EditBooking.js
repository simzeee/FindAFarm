import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editOneBooking, deleteOneBooking } from '../../store/bookings';

export default function EditBooking() {
  const history = useHistory()
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  console.log(bookingId)
  
  const currentBooking = useSelector((state) => state.bookings[bookingId]);

  const [startDate, setStartDate] = useState(currentBooking.startDate);
  const [endDate, setEndDate] = useState(currentBooking.endDate);
  const [numberOfGuests, setNumberOfGuests] = useState(
    currentBooking.numberOfGuests
  );
  const [costOfStay, setCostOfStay] = useState(300);

  const farmId = useSelector((state) => state.bookings[bookingId].farmId);

  const pricerPerDay = useSelector(
    (state) => state.farms[farmId].pricePerDay
  );
  const nameOfFarm = useSelector((state) => state.farms[farmId].name);
  const userId = useSelector((state) => state.session.user.id);

  const updateStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const updateEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const updateNumberOfGuests = (e) => {
    setNumberOfGuests(e.target.value);
  };

  const calculateTotal = () => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const totalDays = timeDifference / (1000 * 3600 * 24);
    setCostOfStay(totalDays * pricerPerDay * numberOfGuests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userId,
      costOfStay,
      startDate,
      endDate,
      farmId,
      numberOfGuests,
      nameOfFarm,
      bookingId,
    };
    console.log(payload);
    dispatch(editOneBooking(payload));
    history.push('/bookings')
  };
  
  const handleDelete = (e) => {
    const payload = { bookingId };
    
    dispatch(deleteOneBooking(payload));
    history.push('/bookings')
    
  };

  useEffect(() => {
    calculateTotal();
  }, [startDate, endDate, numberOfGuests]);

  // if(!currentBooking) return null

  return (
    <>
      <div>
        <h3>Edit Booking:</h3>
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="start">Check-In:</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={updateStartDate}
          required={true}
        ></input>
        <label htmlFor="end">Check-Out:</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={updateEndDate}
          required={true}
        ></input>
        <input
          type="number"
          name="numberDate"
          value={numberOfGuests}
          onChange={updateNumberOfGuests}
          required={true}
        ></input>
        <div>
          <button type="submit">Book</button>
        </div>
      </form>
      <div>
        <button onClick={(e) => handleDelete(e)}>Cancel Your Stay</button>
      </div>
      <div>{costOfStay ? `$${costOfStay}` : '$' + 0}</div>
    </>
  );
}
