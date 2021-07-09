import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import CreateBooking from '../CreateBooking/CreateBooking';
import styles from './OneFarm.module.css';
import { getAllFarms } from '../../store/farms';
import { useEffect } from 'react';
import { getAllAmenities } from '../../store/amenities';
import Amenity from '../EditAmenity/EditAmenity';

export default function Farm() {
  const { farmId } = useParams();

  const dispatch = useDispatch();

  const farm = useSelector((state) => state.farms[farmId]);
  const user = useSelector((state) => state.session.user);
  // const amenityId = useSelector((state) => state.farms[farmId]?.amenityId);

  const amenities = useSelector((state) => state.farms[farmId]?.farmAmenities);

  // let amenitiesArray = [];

  // for (const key in amenities) {
  //   if (amenities[key] === true) amenitiesArray.push(key);
  // }

  useEffect(() => {
    dispatch(getAllFarms());
    dispatch(getAllAmenities());
  }, [dispatch]);

  if (!farm) return null;
  if (!user) {
    return (
      <>
       <div className={styles.oneFarmRootContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.primaryImageContainer}>
              <img
                id={styles.primaryImage}
                src={farm?.primaryImage ? farm?.primaryImage : ''}
              ></img>
            </div>
            <div className={styles.additionalImages}>
              {farm?.secondImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.secondImage ? farm.secondImage : ''}
                  ></img>
                </div>
              )}
              {farm.thirdImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.thirdImage ? farm.thirdImage : ''}
                  ></img>
                </div>
              )}
              {farm.fourthImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.fourthImage ? farm.fourthImage : ''}
                    ></img>
                </div>
              )}
              {farm.fifthImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.fifthImage ? farm.fifthImage : ''}
                    ></img>
                </div>
              )}
            </div>
          </div>
          <div className={styles.infoContainer}>
          <div className={styles.infoLeft}>
          <div>
          </div>
          <div className={styles.farmTitleContainer}>
            <h3 id={styles.farmTitle}>{farm?.name}</h3>
            <div className={styles.descriptionContainer}>
              <h3>About:</h3>
              <div> {farm?.description}</div>
            </div>
          </div>
          <div>
              <div className={styles.amenitiesTitle}>
                <h3>Amenities:</h3>
                </div>
            <div className={styles.amenitiesContainer}>
            {amenities?.map((amenity) => (
              <div key={amenity.id}>{amenity.amenityName}</div>
              ))}
          </div>
              </div>
          </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.oneFarmRootContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.primaryImageContainer}>
              <img
                id={styles.primaryImage}
                src={farm?.primaryImage ? farm?.primaryImage : ''}
              ></img>
            </div>
            <div className={styles.additionalImages}>
              {farm?.secondImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.secondImage ? farm.secondImage : ''}
                  ></img>
                </div>
              )}
              {farm.thirdImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.thirdImage ? farm.thirdImage : ''}
                  ></img>
                </div>
              )}
              {farm.fourthImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.fourthImage ? farm.fourthImage : ''}
                    ></img>
                </div>
              )}
              {farm.fifthImage && (
                <div className={styles.oneImage}>
                  <img
                    className={styles.actualImage}
                    src={farm.fifthImage ? farm.fifthImage : ''}
                    ></img>
                </div>
              )}
            </div>
          </div>
          <div className={styles.infoContainer}>
          <div className={styles.infoLeft}>
          <div>
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
          <div className={styles.farmTitleContainer}>
            <h3 id={styles.farmTitle}>{farm?.name}</h3>
            <div className={styles.descriptionContainer}>
              <h3>About:</h3>
              <div> {farm?.description}</div>
            </div>
          </div>
          <div>
          <div>
            {farm?.userId === user.id ? (
              <NavLink to={`/editFarm/${farmId}`}>
                <button>Edit Your Farm</button>
              </NavLink>
            ) : (
              ''
            )}
          </div>
              <div className={styles.amenitiesTitle}>
                <h3>Amenities:</h3>
                </div>
            <div className={styles.amenitiesContainer}>
            {amenities?.map((amenity) => (
              <div key={amenity.id}>{amenity.amenityName}</div>
              ))}
          </div>
          <div>
            {farm?.userId === user.id ? (
              <NavLink to={`/editAmenities/${farmId}`}>
                <button>Edit Your Amenities</button>
              </NavLink>
            ) : (
              ''
            )}
          </div>
              </div>
          </div>
          <div className={styles.infoRight}>
          <div>
            <CreateBooking></CreateBooking>
          </div>
          </div>
          </div>
        </div>
      </>
    );
  }
}
