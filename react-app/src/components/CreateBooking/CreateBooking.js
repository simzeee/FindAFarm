import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { createOneBooking } from "../../store/bookings";

import styles from "./CreateBooking.module.css";

export default function CreateBooking() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [costOfStay, setCostOfStay] = useState(0);

  const { farmId } = useParams();
  const pricePerDay = useSelector((state) => state.farms[farmId].pricePerDay);
  const nameOfFarm = useSelector((state) => state.farms[farmId].name);
  const userId = useSelector((state) => state.session.user?.id);

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
    setCostOfStay(totalDays * pricePerDay * numberOfGuests);
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
    };
    console.log(payload);
    dispatch(createOneBooking(payload));
    history.push("/bookings");
  };

  useEffect(() => {
    calculateTotal();
  }, [startDate, endDate, numberOfGuests]);

  if (!userId) {
    return (
      <div className={styles.noUser}>
        <NavLink to="/">Login</NavLink>
        <p>or</p>
        <NavLink to="/">Sign Up</NavLink>
        <p>to create a booking!</p>
      </div>
    );
  } else
    return (
      <>
        <div className={styles.bookingRootContainer}>
          <div>
            <h3>Create Booking:</h3>
          </div>
          <form
            className={styles.bookingForm}
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
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
            <div>Price Per Day: ${pricePerDay}</div>
            <div>{costOfStay ? `$${costOfStay}` : "$" + 0}</div>
            <div>
              <button type="submit">Book</button>
            </div>
          </form>
        </div>
      </>
    );
}
