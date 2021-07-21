import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditFarm.module.css';
import { editOneFarm, deleteOneFarm, getAllFarms } from '../../store/farms';
import { deleteOneAmenity, getAllAmenities } from '../../store/amenities';
import EditFarmLocationMap from '../EditFarmLocationMap/EditFarmLocationMap'

export default function EditFarm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { farmId } = useParams();

  const currentFarm = useSelector((state) => state.farms[farmId]);
  const amenityId = currentFarm?.amenityId;

  console.log(currentFarm);

  //current values

  const [farmName, setFarmName] = useState(currentFarm?.name);
  const [pricePerDay, setPricePerDay] = useState(currentFarm?.pricePerDay);
  const [location, setLocation] = useState(currentFarm?.location);
  const [description, setDescription] = useState(currentFarm?.description);
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

  const handleSubmit = async (e) => {
    const payload = {
      farmName,
      pricePerDay,
      location,
      description,
      farmId,
    };

    dispatch(editOneFarm(payload));
    dispatch(getAllAmenities());
    history.push(`/farms/${farmId}`);
  };

  const handleDelete = (e) => {
    const payload = { farmId };
    dispatch(deleteOneFarm(payload));
    dispatch(deleteOneAmenity({ amenityId }));
    dispatch(getAllAmenities());
    dispatch(getAllFarms());
    history.push('/farms');
  };

  useEffect(() => {
    dispatch(getAllFarms());
  }, []);

  return (
    <>
      <div className={styles.farmFormContainer}>
        <div className={styles.farmFormActualContainer}>
          <div className={styles.farmFormTitle}>
            <h3>Your Farm:</h3>
          </div>
          <form
            className={styles.editFarmForm}
            action=""
            id="farmForm"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label>Farm Name:</label>
            <input
              type="text"
              value={farmName}
              onChange={updateFarmName}
              required={true}
            ></input>
            <label>Price Per Day:</label>
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
            <button id="farmSubmit" type="submit">
              Submit
            </button>
          </form>
          <div className={styles.deleteFarm}>
            <h3>Would you like to remove your farm?</h3>
            <div>
              <button onClick={(e) => handleDelete(e)}>Remove Your Farm</button>
            </div>
          </div>
        </div>
      <div>
        <EditFarmLocationMap
          location={currentFarm?.location}
          setLocation={setLocation}
        />
      </div>
      </div>
    </>
  );
}
