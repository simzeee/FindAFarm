import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import EditFarmPhotos from '../EditFarmPhotos/EditFarmPhotos';
import CreateBooking from '../CreateBooking/CreateBooking';
import styles from './OneFarm.module.css'
import { getAllFarms, getOneFarm } from '../../store/farms';
import { useEffect } from 'react';

export default function Farm() {
  const { farmId } = useParams();
  
  const dispatch = useDispatch()

  const farm = useSelector((state) => state.farms[farmId]);
  const user = useSelector((state) => state.session.user);
  
  useEffect(()=>{
    dispatch(getAllFarms())
    
  },[dispatch])

  if(!farm) return null

  if(!user){
    return (
    <>
      <div>{farm?.name}</div>
      <div>Price Per Day: ${farm?.pricePerDay}</div>
      <div className={styles.imageContainer}>
        <div className={styles.oneImage}>
          <img src={farm?.primaryImage ? farm?.primaryImage : ''}></img>
        </div>
        {farm?.secondImage &&  <div className={styles.oneImage}>
          <img src={farm.secondImage ? farm.secondImage : ''}></img>
        </div >}
        {farm?.thirdImage &&  <div className={styles.oneImage}>
          <img src={farm.thirdImage ? farm.thirdImage : ''}></img>
        </div >}
        {farm?.fourthImage &&  <div className={styles.oneImage}>
          <img src={farm.fourthImage ? farm.fourthImage : ''}></img>
        </div >}
        {farm?.fifthImage &&  <div className={styles.oneImage}>
          <img src={farm.fifthImage ? farm.fifthImage : ''}></img>
        </div >}
    
      </div>
      <div>
        {farm?.userId === user?.id ? (
          <NavLink to={`/editFarm/${farmId}`}>
            <button>Edit Your Farm</button>
          </NavLink>
        ) : (
          ''
        )}
      </div>
      <div>
        {farm?.userId === user?.id ? (
          <NavLink to={`/editFarmPhotos/${farmId}`}>
            <button>Edit Your Farm's Photos</button>
          </NavLink>
        ) : (
          ''
        )}
      </div>
    </>
  );
  }
  else{
    return (
      <>
        <div>{farm?.name}</div>
        <div>Price Per Day: ${farm?.pricePerDay}</div>
        <div className={styles.imageContainer}>
          <div className={styles.oneImage}>
            <img src={farm?.primaryImage ? farm?.primaryImage : ''}></img>
          </div>
          {farm?.secondImage &&  <div className={styles.oneImage}>
            <img src={farm.secondImage ? farm.secondImage : ''}></img>
          </div >}
          {farm.thirdImage &&  <div className={styles.oneImage}>
            <img src={farm.thirdImage ? farm.thirdImage : ''}></img>
          </div >}
          {farm.fourthImage &&  <div className={styles.oneImage}>
            <img src={farm.fourthImage ? farm.fourthImage : ''}></img>
          </div >}
          {farm.fifthImage &&  <div className={styles.oneImage}>
            <img src={farm.fifthImage ? farm.fifthImage : ''}></img>
          </div >}
      
        </div>
        <div>
          <CreateBooking></CreateBooking>
        </div>
        <div>
          {farm?.userId === user.id ? (
            <NavLink to={`/editFarm/${farmId}`}>
              <button>Edit Your Farm</button>
            </NavLink>
          ) : (
            ''
          )}
        </div>
        <div>
          {farm?.userId === user.id ? (
            <NavLink to={`/editFarmPhotos/${farmId}`}>
              <button>Edit Your Farm's Photos</button>
            </NavLink>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}
