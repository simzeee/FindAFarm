import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditFarmPhotos.module.css';
import { editOneFarm, deleteOneFarm, getAllFarms } from '../../store/farms';
import { getAllAmenities, deleteOneAmenity } from '../../store/amenities';

export default function EditFarmPhotos() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { farmId } = useParams();

  const currentFarm = useSelector((state) => state.farms[farmId]);
  const amenityId = currentFarm.amenityId

  console.log("AMENITY ID IN EDIT FARM PHOTOS", amenityId)
  //current values

  const [primaryImage, setPrimaryImage] = useState(currentFarm.primaryImage);
  const [secondImage, setSecondImage] = useState(currentFarm.secondImage);
  const [thirdImage, setThirdImage] = useState(currentFarm.thirdImage);
  const [fourthImage, setFourthImage] = useState(currentFarm.fourthImage);
  const [fifthImage, setFifthImage] = useState(currentFarm.fifthImage);
  const [imageLoading, setImageLoading] = useState(false);

  const [farmName, setFarmName] = useState(currentFarm.name);
  const [pricePerDay, setPricePerDay] = useState(currentFarm.pricePerDay);
  const [location, setLocation] = useState(currentFarm.location);
  const [description, setDescription] = useState(currentFarm.description);

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
    console.log(files[0]);
    setSecondImage(files[0]);
    console.log(files[1]);
    setThirdImage(files[1]);
    console.log(files[2]);
    setFourthImage(files[2]);
    console.log(files[3]);
    setFifthImage(files[3]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('primaryImage', primaryImage);
    formData.append('secondImage', secondImage);
    formData.append('thirdImage', thirdImage);
    formData.append('fourthImage', fourthImage);
    formData.append('fifthImage', fifthImage);
    formData.append('farmId', farmId);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch('/api/images/', {
      method: 'PUT',
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      // history.push('/farms');
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
      farmId,
    };

    dispatch(editOneFarm(payload));
    history.push(`/farms/${farmId}`);
  };

  const handleDelete = (e) => {
    console.log("IN HANDLE DELETE", amenityId)
    const payload = { farmId };
    dispatch(deleteOneFarm(payload));
    dispatch(deleteOneAmenity({amenityId}))
    dispatch(getAllAmenities())
    dispatch(getAllFarms())
    history.push('/farms')
  };

  return (
    <>
      <div className={styles.farmFormContainer}>
        <div>
          <form action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
            <label>Select your Primary Image:</label>
            <input type="file" accept="image/*" onChange={updateImage} required={true} />
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
      <div>
        <h3>Would you like to remove your farm?</h3>
        <div>
          <button onClick={(e) => handleDelete(e)}>Remove Your Farm</button>
        </div>
      </div>
    </>
  );
}
