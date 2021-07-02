import React from 'react';
import { useDispatch } from 'react-redux';

export default function CreateFarm() {
  const dispatch = useDispatch();

const handleSubmit = (e) => {
  e.preventDefault()
}

  return (
    <>
      <div>
        <div>
          <h3>Your Farm:</h3>
        </div>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <label>
            <input></input>
          </label>
        </form>
      </div>
    </>
  );
}
