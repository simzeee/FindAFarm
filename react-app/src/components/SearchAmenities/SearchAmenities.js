import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAllFarms } from '../../store/search';
import { Redirect, useHistory } from 'react-router';

export default function SearchAmenities() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [goatYoga, setGoatYoga] = useState(false);
  const [tableMaking, setTableMaking] = useState(false);
  const [pigRoast, setPigRoast] = useState(false);

  const updateGoatYoga = (e) => {
    const goatInput = document.querySelector('#goatYoga');
    const searchButton = document.querySelector('#farmSubmit');
    if (goatInput.checked === true) {
      setGoatYoga(true);
      searchButton.disabled = false;
    }
    if (goatInput.checked === false) {
      setGoatYoga(false);
      searchButton.disabled = true;
    }
  };

  const updateTableMaking = (e) => {
    const tableMakingInput = document.querySelector('#tableMaking');
    const searchButton = document.querySelector('#farmSubmit');

    if (tableMakingInput.checked === true) {
      setTableMaking(true);
      searchButton.disabled = false;
    }
    if (tableMakingInput.checked === false) {
      setTableMaking(false);
      searchButton.disabled = true;
    }
  };

  const updatePigRoast = (e) => {
    const pigRoast = document.querySelector('#pigRoast');
    const searchButton = document.querySelector('#farmSubmit');

    if (pigRoast.checked === true) {
      setPigRoast(true);
      searchButton.disabled = false;
    }
    if (pigRoast.checked === false) {
      searchButton.disabled = true;
      setPigRoast(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(goatYoga, tableMaking, pigRoast);
    let payload = {
      'Goat Yoga': goatYoga,
      'Table Making': tableMaking,
      'Pig Roast': pigRoast,
    };

    dispatch(searchAllFarms(payload));

    history.push('/searchResults');
  };

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
          <button id="farmSubmit" type="submit" disabled={true}>
            Search
          </button>
        </form>
      </div>
    </>
  );
}
