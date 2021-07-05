import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPicture from '../UploadPicture/UploadPicture';
import { becomeFarmer } from '../../store/session';
import { useHistory } from 'react-router-dom';

export default function LoggedInHome() {

  const history = useHistory()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.session.user);
  const [farmer, setFarmer] = useState(currentUser.farmer);

  const makeFarmer = (e) => {

    let selectValue = document.querySelector('#checkbox');
    let farmSubmit = document.getElementById('farmSubmit');
    // debugger
    if ((selectValue.value = 'yes' && farmSubmit.disabled === true)) {
      farmSubmit.disabled = false;
    }
    else if (farmSubmit.disabled === false) {
      farmSubmit.disabled = true;
    }
  };

  const goMakeFarm = (e) => {
    e.preventDefault()
    const userId = currentUser.id
    dispatch(becomeFarmer(userId))
    history.push('/farms')
    
  }

  if (!currentUser.farmer) {
    return (
      <>
        <div>Are you a farmer?</div>
        <form action="" onSubmit={goMakeFarm}>
          {/* <select id="farmSelect" onInput={makeFarmer}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select> */}
          <div>
          <label>Yes</label>
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
      </>
    );
  }

  // const bookings = useSelector((state) => state.bookings)

  // useEffect(()=>{
  //   dispatch(getAllBookings())
  // },[])
  else {
    return (
      <>
        <h1>You are a logged in Farmer</h1>
        <div>
          <UploadPicture></UploadPicture>
        </div>
      </>
    );
  }
}
