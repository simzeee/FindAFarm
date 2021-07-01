import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../store/bookings'
import CreateBooking from '../CreateBooking/CreateBooking'
import UploadPicture from '../UploadPicture/UploadPicture'


export default function LoggedInHome(){

  const dispatch = useDispatch()

  const bookings = useSelector((state) => state.bookings)

  // useEffect(()=>{
  //   dispatch(getAllBookings())
  // },[])

  return (
    <>
    <h1>You are logged in</h1>
    <div><UploadPicture></UploadPicture></div>
    </>
  )
}