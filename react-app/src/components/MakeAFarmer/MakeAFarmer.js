import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPicture from '../UploadPicture/UploadPicture';
import SearchAmenities from '../SearchAmenities/SearchAmenities';
import { becomeFarmer } from '../../store/session';
import { useHistory } from 'react-router-dom';

import styles from './MakeAFarmer.module.css'

export default function LoggedInHome(thisUser) {

  console.log("THIS USER", thisUser)

  const history = useHistory()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.session.user);
  const [farmer, setFarmer] = useState(currentUser.farmer);

  const makeFarmer = (e) => {

    let selectValue = document.querySelector('#checkbox');
    // let selectValue = document.querySelector('#farmSelect');
    let farmSubmit = document.getElementById('farmSubmit');
    
    if ((selectValue.value = 'yes' && farmSubmit.disabled === true)) {
      farmSubmit.disabled = false;
    }
    else if (farmSubmit.disabled === false) {
      farmSubmit.disabled = true;
    }
  };

  console.log("CURRENT USER", currentUser)

  const goMakeFarm = (e) => {
    e.preventDefault()
    const userId = thisUser.currentUser.id
    dispatch(becomeFarmer(userId))
    history.push('/farms')
    
  }

  if (!currentUser.farmer) {
    return (
      <>
      <div className={styles.makeFarmerContainer}>
        <div>Are you a farmer?</div>
        <form className={styles.makeFarmerForm} action="" onSubmit={goMakeFarm}>
          {/* <select id="farmSelect" onInput={makeFarmer}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select> */}
          <div className={styles.makeFarmerLabelContainer}>
          <label className={styles.actualLabel}>Yes</label>
          <input type="checkbox" id="checkbox" onInput={makeFarmer}></input>
          </div>
          <button
            type="submit"
            id="farmSubmit"
            disabled={true}
          >
            Go List Your Farm!
          </button>
        </form>
      </div>
      </>
    );
  }

  else {
    return (
      <>
        {/* <h1>You are a logged in Farmer</h1>
        <div>
          <h1>Hello</h1>
          <SearchAmenities></SearchAmenities>
        </div> */}
      </>
    );
  }
}
