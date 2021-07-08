import React, { useEffect, useState } from 'react';
import { getAllAmenities } from '../../store/amenities';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAllFarms } from '../../store/farms';
import { editOneFarmAmenities } from '../../store/farms';

export default function Amenity({ amenities }) {
  const history = useHistory();
  const { farmId } = useParams();
  const dispatch = useDispatch();

  const currentFarm = useSelector((state) => state.farms[farmId]);
  const allAmenities = useSelector((state) => state.amenities);

  const [checkedState, setCheckedState] = useState(false);

  const initialStateSetter = (all) => {
    const stateObject = {};
    all &&
      Object.values(all).forEach((amenity) => {
        stateObject[amenity.amenityName] = false;
      });
    return stateObject;
  };

  const [stateAmenities, setStateAmenities] = useState(
    initialStateSetter(allAmenities)
  );

  const changeSubmit = (someState) => {
    const submitButton = document.querySelector('#editSubmit');
    if (Object.values(someState).includes(true)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
    console.log(someState);
  };

  const updateAmenityState = (e, amenityName, amenityValue) => {
    console.log(e.target.id);

    setStateAmenities((oldState) => {
      console.log(amenityName);
      console.log('VALUE', e.target.id.checked, amenityValue);
      if (e.target.id.checked === false) {
        setCheckedState(true);
      }

      let result = { ...oldState, [amenityName]: Boolean(amenityValue) };
      changeSubmit(result);
      return result;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {stateAmenities,farmId}
    console.log("PAYLOAD", payload)
    dispatch(editOneFarmAmenities(payload))
    // dispatch(getAllFarms())
    history.push(`/farms/${farmId}`)
  }

  useEffect(() => {
    dispatch(getAllAmenities());
    dispatch(getAllFarms());
  }, []);

  return (
    <>
      <div>
        <form action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h4>Available Amenities:</h4>
        </label>
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
         <button id="editSubmit" type="submit" disabled={true}>
            Edit
          </button>
          </form>
      </div>
    </>
  );
}