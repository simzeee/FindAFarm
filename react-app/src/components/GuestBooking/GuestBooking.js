import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../store/bookings'
import { getAllFarms } from '../../store/farms';
import { NavLink } from 'react-router-dom'

import styles from './GuestBooking.module.css'

export default function GuestBooking(){

  const dispatch = useDispatch()

  const bookings = useSelector((state) => Object.values(state.bookings))
  
  useEffect(()=>{
    dispatch(getAllBookings())
    dispatch(getAllFarms())
  },[])


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