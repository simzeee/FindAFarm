import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import styles from './EditFarm.module.css'
import { createOneFarm } from '../../store/farms';
import {getAllFarms, getOneFarm} from '../../store/farms'

export default function EditFarm(){

  const history = useHistory();
  const dispatch = useDispatch();
  const { farmId } = useParams()


  const currentFarm = useSelector((state) => state.farms[farmId])

  //current values

  const [primaryImage, setPrimaryImage] = useState(currentFarm.primaryImage);
  const [secondImage, setSecondImage] = useState(currentFarm.secondImage)
  const [thirdImage, setThirdImage] = useState(currentFarm.thirdImage)
  const [fourthImage, setFourthImage] = useState(currentFarm.fourthImage)
  const [fifthImage, setFifthImage] = useState(currentFarm.fifthImage)
  const [farmName, setFarmName] = useState(currentFarm.name);
  const [pricePerDay, setPricePerDay] = useState(currentFarm.pricePerDay);
  const [location, setLocation] = useState(currentFarm.location);
  const [description, setDescription] = useState(currentFarm.description);
  const [imageLoading, setImageLoading] = useState(false);


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
    
    const formData = new FormData();
    formData.append('primaryImage', primaryImage);
    formData.append('secondImage', secondImage)
    formData.append('thirdImage', thirdImage)
    formData.append('fourthImage', fourthImage)
    formData.append('fifthImage', fifthImage)
    formData.append('farmName', farmName)
    formData.append('farmId', farmId)
    

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
   

    const res = await fetch('/api/images/', {
      method: 'POST',
      body: formData
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
    };

    // dispatch(createOneFarm(payload))

  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    setPrimaryImage(file);
  };

  const updateSupplementalImages = (e) => {
    const files = e.target.files;
    const keysArray=Object.keys(files)

    const submitButton = document.getElementById('farmSubmit')

    if(keysArray.length>4){

      alert("No more than 4 photos.")
      submitButton.disabled=true
      return
    }
    submitButton.disabled=false
    console.log(files[0])
    setSecondImage(files[0])
    console.log(files[1])
    setThirdImage(files[1])
    console.log(files[2])
    setFourthImage(files[2])
    console.log(files[3])
    setFifthImage(files[3])
  }


    useEffect(()=>{
      console.log("Use Effect went off")
    dispatch(getOneFarm(farmId))
  }, [dispatch, farmId])

  console.log(currentFarm)

  if(!currentFarm) return null


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
            <input type="number" value={pricePerDay} onChange={updatePricePerDay}></input>
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
            <label>Select your Primary Image:</label>
            <input type="file" accept="image/*" onChange={updateImage}/>
            <label>Select Up to Four more Images</label>
            <input type="file" accept="image/*" multiple onChange={updateSupplementalImages}></input>
            <button id="farmSubmit" type="submit">Submit</button>
            {imageLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </>
  );
}