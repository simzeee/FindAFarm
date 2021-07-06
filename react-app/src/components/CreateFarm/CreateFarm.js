import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './CreateFarm.module.css';
import { createOneFarm } from '../../store/farms';
import { createOneAmenity } from '../../store/amenities';

export default function CreateFarm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);
  const [fifthImage, setFifthImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
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
    e.preventDefault();

    const formData = new FormData();
    formData.append('primaryImage', primaryImage);
    formData.append('secondImage', secondImage);
    formData.append('thirdImage', thirdImage);
    formData.append('fourthImage', fourthImage);
    formData.append('fifthImage', fifthImage);
    formData.append('farmName', farmName);
    formData.append('farmId', '');

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
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log('error');
    }

    const payload = {
      farmName,
      pricePerDay,
      location,
      description,
    };

    const amenities = {
      goatYoga,
      tableMaking,
      pigRoast,
      farmName,
    };

    dispatch(createOneFarm(payload)).then(()=>dispatch(createOneAmenity(amenities)))

    // history.push('/farms');
  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    setPrimaryImage(file);
  };

  const updateSupplementalImages = (e) => {
    const files = e.target.files;
    const keysArray = Object.keys(files);

    const submitButton = document.getElementById('farmSubmit');

    if (keysArray.length > 4) {
      alert('No more than 4 photos.');
      submitButton.disabled = true;
      return;
    }
    submitButton.disabled = false;

    setSecondImage(files[0]);
    setThirdImage(files[1]);
    setFourthImage(files[2]);
    setFifthImage(files[3]);
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
            <label>
              <h4>Amenities:</h4>
            </label>
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
            <label>Select your Primary Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              required={true}
            />
            <label>Select Up to Four more Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={updateSupplementalImages}
            ></input>
            <button id="farmSubmit" type="submit">
              Submit
            </button>
            {imageLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </>
  );
}
