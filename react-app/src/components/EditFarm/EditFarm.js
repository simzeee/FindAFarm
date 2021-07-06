import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditFarm.module.css';
import { editOneFarm, deleteOneFarm, getAllFarms } from '../../store/farms';
import { deleteOneAmenity, getAllAmenities } from '../../store/amenities';

export default function EditFarm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { farmId } = useParams();

  const currentFarm = useSelector((state) => state.farms[farmId]);
  const amenityId = currentFarm.amenityId

  console.log("AMENITY ID IN EDIT FARM", amenityId)

  //current values

  
  const [farmName, setFarmName] = useState(currentFarm.name);
  const [pricePerDay, setPricePerDay] = useState(currentFarm.pricePerDay);
  const [location, setLocation] = useState(currentFarm.location);
  const [description, setDescription] = useState(currentFarm.description);
  const [goatYoga, setGoatYoga] = useState(false);
  const [tableMaking, setTableMaking] = useState(false);
  const [pigRoast, setPigRoast] = useState(false);

  const updateFarmName = (e) => {
    setFarmName(e.target.value);
  };

  const updatePricePerDay = (e) => {
    setPricePerDay(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };


  const updateGoatYoga = (e) => {
    const goatInput = document.querySelector('#goatYoga');

    if (goatInput.checked === true) {
      setGoatYoga(true);
    }
    if (goatInput.checked === false) {
      setGoatYoga(false);
    }
  };

  const updateTableMaking = (e) => {
    const tableMakingInput = document.querySelector('#tableMaking');

    if (tableMakingInput.checked === true) {
      setTableMaking(true);
    }
    if (tableMakingInput.checked === false) {
      setTableMaking(false);
    }
  };

  const updatePigRoast = (e) => {
    const pigRoast = document.querySelector('#pigRoast');

    if (pigRoast.checked === true) {
      setPigRoast(true);
    }
    if (pigRoast.checked === false) {
      setPigRoast(false);
    }
  };

  const handleSubmit = async (e) => {

    const payload = {
      farmName,
      pricePerDay,
      location,
      description,
      farmId,
      goatYoga,
      tableMaking,
      pigRoast,
      amenityId
    };

    dispatch(editOneFarm(payload));
    dispatch(getAllAmenities())
    history.push(`/farms/${farmId}`)
  };

const handleDelete = (e) => {
  const payload = {farmId}
  dispatch(deleteOneFarm(payload))
  dispatch(deleteOneAmenity({amenityId}))
  dispatch(getAllAmenities())
  dispatch(getAllFarms())
  history.push('/farms')
}

  return (
    <>
      <div className={styles.farmFormContainer}>
        <div>
          <div>
            <h3>Your Farm:</h3>
          </div>
          <form action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
            <label>Farm Name:</label>
            <input
              type="text"
              value={farmName}
              onChange={updateFarmName}
              required={true}
            ></input>
            <label>pricePerDay:</label>
            <input
              type="number"
              value={pricePerDay}
              onChange={updatePricePerDay}
            ></input>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={updateLocation}
              required={true}
            ></input>
            <label>Description:</label>
            <textarea
              form="farmForm"
              value={description}
              onChange={updateDescription}
              required={true}
            ></textarea>
            <div>
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
            </div>
             <button id="farmSubmit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <h3>Would you like to remove your farm?</h3>
        <div><button onClick={(e) => handleDelete(e)}>Remove Your Farm</button></div>
      </div>
    </>
  );
}
