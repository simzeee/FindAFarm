import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UploadPicture from '../UploadPicture/UploadPicture';
import styles from './CreateFarm.module.css';
import { createOneFarm } from '../../store/farms';

export default function CreateFarm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

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
    e.preventDefault();

    const payload = {
      farmName,
      pricePerDay,
      location,
      description,
    };
    console.log(payload)

    dispatch(createOneFarm(payload))

    const formData = new FormData();
    formData.append('image', image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch('/api/images/', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push('/farms');
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log('error');
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

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
            ></input>
            <label>pricePerDay:</label>
            <input type="number" value={pricePerDay} onChange={updatePricePerDay}></input>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={updateLocation}
            ></input>
            <label>Description:</label>
            <textarea
              form="farmForm"
              value={description}
              onChange={updateDescription}
            ></textarea>
            <input type="file" accept="image/*" onChange={updateImage} />
            <button type="submit">Submit</button>
            {imageLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </>
  );
}
