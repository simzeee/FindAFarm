import React, { useEffect, useState } from 'react';
import { getAllAmenities } from '../../store/amenities';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { editOneFarmAmenities } from '../../store/farms';

import styles from './EditAmenity.module.css'

export default function Amenity({ amenities }) {
  const history = useHistory();
  const { farmId } = useParams();
  const dispatch = useDispatch();

  const currentFarm = useSelector((state) => state.farms[farmId]);
  const allAmenities = useSelector((state) => state.amenities);
  const farmAmenitiesObject = useSelector((state)=> state.farms[farmId]?.farmAmenities ? Object.values(state.farms[farmId]?.farmAmenities) : "")

  console.log("THIS FARM", typeof(farmAmenitiesObject), farmAmenitiesObject[0])

  let idsArray = []
  
  for (const key in farmAmenitiesObject) {
    console.log(farmAmenitiesObject[key])
    idsArray.push(farmAmenitiesObject[key].id)
  }


  const initialStateSetter = (all) => {
    const stateObject = {};
    all &&
      Object.values(all).forEach((amenity) => {

        let amChecked = document.getElementById(`${amenity.amenityName}`)


        if(amChecked){
          
          stateObject[amenity.amenityName] = amChecked.checked;  
        }
        stateObject[amenity.amenityName] = amChecked?.checked;
      });
      
    return stateObject;
  };

  const [stateAmenities, setStateAmenities] = useState(
    initialStateSetter(allAmenities)
  );

  const changeSubmit = (someState) => {
    const submitButton = document.querySelector('#editSubmit');
    if (Object.values(someState)?.includes(true)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  
  };

  
  const updateAmenityState = (e, amenityName, amenityValue) => {

    setStateAmenities((oldState) => {

      let result = { ...oldState, [amenityName]: e.target.checked };
      changeSubmit(result);
      return result;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {stateAmenities,farmId}
    // debugger
    dispatch(editOneFarmAmenities(payload))
    dispatch(getAllFarms())
    history.push(`/farms/${farmId}`)
  }

  useEffect(() => {
    dispatch(getAllAmenities());
    dispatch(getAllFarms());
    setStateAmenities(initialStateSetter(allAmenities))
  }, []);

  return (
    <>
      <div className={styles.editAmenityRootContainer}>
        <form className={styles.editAmenityForm} action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h4>Available Amenities:</h4>
        </label>
        {Object.values(allAmenities)?.map((amenity) => (
          <div key={amenity.id} className={styles.editAmenityInputs}>
            <div className={styles.amenityLabel}>
            <label>{amenity.amenityName}</label>
            </div>
            <input 
              type="checkbox"
              id={amenity.amenityName}
              value={!!stateAmenities[amenity.amenityName]}
              onClick={(e) => updateAmenityState(e, e.target.id, e.target.value)}
              // checked={idsArray.includes(amenity.id)}
              defaultChecked={idsArray.includes(amenity.id)}
            ></input>
          </div>
        ))}
         <button id="editSubmit" type="submit" disabled={true}>
            Edit
          </button>
          </form>
      </div>
    </>
  );
}
