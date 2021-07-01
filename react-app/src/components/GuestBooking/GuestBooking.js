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
      {bookings.map((booking)=> (
        <NavLink to={`/bookings/${booking.id}`} key={booking.id}>
          <div>{booking.name_of_farm}</div>
          <div>{booking.start_day}-{booking.end_day}</div>
        </NavLink>
      ))}
    </div>
    </>
  )

}