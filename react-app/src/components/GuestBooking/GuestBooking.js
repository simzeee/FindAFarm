import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../store/bookings'
import { getAllFarms } from '../../store/farms';
import { NavLink } from 'react-router-dom'

export default function GuestBooking(){

  const dispatch = useDispatch()

  const bookings = useSelector((state) => Object.values(state.bookings))
  
  useEffect(()=>{
    dispatch(getAllBookings())
    dispatch(getAllFarms())
  },[])


  return(
    <>
    <div><h1>Your Bookings:</h1></div>
    <div>
      {bookings&&Object.values(bookings).map((booking)=> (
        <NavLink to={`/editBookings/${booking.id? booking.id:booking.bookingId}`} key={booking.id? booking.id:booking.bookingId}>
          <div>{booking.nameOfFarm}</div>
          <div>{booking.startDate}-{booking.endDate}</div>
        </NavLink>
      ))}
    </div>
    </>
  )

}