import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../store/bookings'
import { getAllFarms } from '../../store/farms';
import { NavLink, useHistory } from 'react-router-dom'
import { clearBookings } from '../../store/bookings';

import styles from './GuestBooking.module.css'

export default function GuestBooking(){
  const history = useHistory()

  const dispatch = useDispatch()

  const bookings = useSelector((state) => Object.values(state.bookings))
  const currentUser = useSelector((state) => state.session.user);
  
  let ids = bookings.map((booking) => {
   
    return booking.id;
  });



  // console.log("CURRENT USER HERE", currentUser)
  
  useEffect(()=>{
    console.log("IDS IN USE EFFECT", ids)
    console.log("In use effect?\n\n\n\n")
    dispatch(clearBookings({ids}))
    dispatch(getAllBookings())
    dispatch(getAllFarms())
  },[])

  const returnHome = () => {
    window.scrollTo(0,0);
    history.push("/")
  };

  if(!bookings.length)
  return (
    <div className={styles.noResultsContainer}>
    <img></img>
    <h2 id={styles.noResultsHeader}>
      You have no bookings! Let's plan a trip!
    </h2>
    <div className={styles.returnButton}>
      <button onClick={()=> returnHome()}>Find a farm!</button>
    </div>
  </div>
  )

  return(
    <>
    <div className={styles.bookingRootContainer}>
    <div className={styles.bookingTitle}><h1>Your Bookings:</h1></div>
    <div className={styles.bookingsContainer}>
      {bookings&&Object.values(bookings).map((booking)=> (
        <div className={styles.oneBooking}>
        <NavLink to={`/editBookings/${booking.id? booking.id:booking.bookingId}`} key={booking.id? booking.id:booking.bookingId}>
          <div>Name: {booking.nameOfFarm}</div>
          <div>Date: {booking.startDate}-{booking.endDate}</div>
          <div>Total Cost: {booking.costOfStay}</div>
        </NavLink>
        </div>
      ))}
    </div>
    </div>
    </>
  )

}