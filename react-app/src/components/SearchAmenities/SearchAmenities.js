import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllFarms } from '../../store/search';
import { useHistory } from 'react-router';
import { getAllAmenities } from '../../store/amenities';

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
      console.log(amenityName)
      console.log("VALUE", e.target.id.checked, amenityValue)
      if(e.target.id.checked === false){
        setCheckedState(true)
      }
      
      
      let result = { ...oldState, [amenityName]: Boolean(amenityValue) };
      changeSubmit(result)
      return result
      
    });
  };

 
  
  // console.log('STATE AMENITIES', stateAmenities)


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    dispatch(searchAllFarms(stateAmenities));

    history.push('/searchResults');
  };

  useEffect(() => {
    dispatch(getAllAmenities());
  }, []);

  return (
    <>
      <div>
        <form action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
          <label>Search:</label>
          {Object.values(allAmenities)?.map((amenity) => (
            <div key={amenity.id}>
              <label>{amenity.amenityName}</label>
              <input
                type="checkbox"
                id={amenity.amenityName}
                value={!!stateAmenities[amenity.amenityName]}
                onClick={(e) => updateAmenityState(e, e.target.id, e.target.value)}
              ></input>
            </div>
          ))}
          <button id="searchSubmit" type="submit" disabled={true}>
            Search
          </button>
        </form>
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
