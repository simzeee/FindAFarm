import React, { useEffect, useState } from 'react';
import { getAllFarms} from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';
import { useDispatch } from 'react-redux';

export default function SearchAmenities() {
  // const dispatch = useDispatch()

  const [goatYoga, setGoatYoga] = useState(false);
  const [tableMaking, setTableMaking] = useState(false);
  const [pigRoast, setPigRoast] = useState(false);

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
    e.preventDefault()
    console.log(goatYoga, tableMaking, pigRoast)
  }

  // useEffect(()=>{
  //   dispatch(getAllFarms());
  //   dispatch(getAllAmenities());
  // }, [])

  return (
    <>
    <div>
      <form action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
        <label>Search:</label>
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
    </>
  );
}
