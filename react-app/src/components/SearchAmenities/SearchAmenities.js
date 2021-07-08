import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllFarms } from '../../store/search';
import { useHistory } from 'react-router';
import { getAllAmenities } from '../../store/amenities';

import styles from './SearchAmenities.module.css'

export default function SearchAmenities() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [checkedState, setCheckedState] = useState(false)
  
  const allAmenities = useSelector((state) => state.amenities);
  
  const initialStateSetter = (all) => {
    const stateObject = {};
    all && Object.values(all).forEach((amenity) => {
      
      stateObject[amenity.amenityName] = false;
    });
    return stateObject;
  };

  const [stateAmenities, setStateAmenities] = useState(initialStateSetter(allAmenities));
  
  const changeSubmit = (someState) => {
    const submitButton = document.querySelector("#searchSubmit")
      if(Object.values(someState).includes(true)){
        submitButton.disabled = false
      }
      else{
        submitButton.disabled = true
      }
      console.log(someState)
  }

  const updateAmenityState = (e, amenityName, amenityValue) => {
    console.log(e.target.id)

    setStateAmenities((oldState) => {
      // console.log(amenityName)
      console.log("VALUE", e.target.id.checked, amenityValue, e.target.checked)
      if(e.target.id.checked === false){
        setCheckedState(true)
      }
      
      
      let result = { ...oldState, [amenityName]: e.target.checked };
      changeSubmit(result)
      return result
      
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('STATE AMENITIES', stateAmenities)
    
    dispatch(searchAllFarms(stateAmenities));

    history.push('/searchResults');
  };

  useEffect(() => {
    dispatch(getAllAmenities());
  }, []);

  return (
    <>
      <div className={styles.searchContainer}>
          <div><label>Search:</label></div>
        <form action="" id="farmForm" className={styles.searchForm} onSubmit={(e) => handleSubmit(e)}> 
          {Object.values(allAmenities)?.map((amenity) => (
            <div key={amenity.id} className={styles.amenityDiv}>
              <label>{amenity.amenityName}</label>
              <div className={styles.amenityInput}>
              <input
                type="checkbox"
                id={amenity.amenityName}
                value={!!stateAmenities[amenity.amenityName]}
                onClick={(e) => updateAmenityState(e, e.target.id, e.target.value)}
              ></input>
              </div>
            </div>
          ))}
        </form>
          <div><button id="searchSubmit" type="submit" disabled={true}>
            Search
          </button>
          </div>
      </div>
    </>
  );
}
{
  /* <div>
            <label>Goat Yoga</label>
            <input
              type="checkbox"
              id="goatYoga"
              value={goatYoga}
              onClick={updateGoatYoga}
            ></input>
            <label>Table Making</label>
            <input
              type="checkbox"
              id="tableMaking"
              value={tableMaking}
              onClick={updateTableMaking}
            ></input>
            <label>Pig Roast</label>
            <input
              type="checkbox"
              id="pigRoast"
              value={pigRoast}
              onClick={updatePigRoast}
            ></input>
          </div> */
}
