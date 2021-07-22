import React, { useEffect } from 'react';
import { getAllFarms } from '../../store/farms';
import { useDispatch, useSelector } from 'react-redux';
import SearchAmenities from '../SearchAmenities/SearchAmenities';

import styles from './SplashPage.module.css';
import gardenImage from './VegetableGarden.jpeg';
import cutePigs from './cutePigs.jpeg'
import cuteCow from './cuteCow.png'
import MapContainer from '../ApiGoogleMap/ApiGoogleMap';
import AllFarmsMap from '../AllFarmsMap/AllFarmsMap';


export default function SplashPage() {
  // const dispatch = useDispatch();
  // const farms = useSelector((state) => state.farms);

  // useEffect(() => {
  //   dispatch(getAllFarms());
  // },[]);

  return (
    <div className={styles.rootContainer}>
        <div className={styles.header}>
          <h1>Find A Farm</h1>
        </div>
      <div className={styles.gardenImage}>
        <div className={styles.searchComponent}>
          <SearchAmenities />
        </div>
        <img id={styles.one} src={gardenImage} />
      </div>
      <div className={styles.farmAnimalContainer}>
        <div className={styles.pigs}>
          <img id={styles.cutePigs} src={cutePigs}/>
        </div>
        <div className={styles.cow}>
          <img id={styles.cuteCow} src={cuteCow}/>
        </div>
      </div>
      <div className={styles.mapContainer}>
          <AllFarmsMap></AllFarmsMap>
      </div>
      {/* <div>
        <MapContainer></MapContainer>
      </div> */}
    </div>
  );
}
