import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import EditFarmPhotos from '../EditFarmPhotos/EditFarmPhotos';
import CreateBooking from '../CreateBooking/CreateBooking';
import styles from './OneFarm.module.css'

export default function Farm() {
  const { farmId } = useParams();

  const farm = useSelector((state) => state.farms[farmId]);
  const userId = useSelector((state) => state.session.user.id);
  const farmerId = useSelector((state) => state.farms[farmId].userId);

  return (
    <>
      <div>{farm.name}</div>
      <div>Price Per Day: ${farm.pricePerDay}</div>
      <div className={styles.imageContainer}>
        <div className={styles.oneImage}>
          <img src={farm.primaryImage ? farm.primaryImage : ''}></img>
        </div>
        {farm.secondImage &&  <div className={styles.oneImage}>
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
        {farmerId === userId ? (
          <NavLink to={`/editFarm/${farmId}`}>
            <button>Edit Your Farm</button>
          </NavLink>
        ) : (
          ''
        )}
      </div>
      <div>
        {farmerId === userId ? (
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
