import React from 'react';
import { useDispatch } from 'react-redux';
import UploadPicture from '../UploadPicture/UploadPicture';
import styles from './CreateFarm.module.css';

export default function CreateFarm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <input type="text"></input>
            <label>Rate:</label>
            <input type="number"></input>
            <label>Location:</label>
            <input type="text"></input>
          </form>
        </div>
        <label>Description:</label>
        <textarea form="farmForm"></textarea>
        <div>
          <UploadPicture></UploadPicture>
        </div>
        <div>
          <UploadPicture></UploadPicture>
        </div>
        <div>
          <UploadPicture></UploadPicture>
        </div>
      </div>
    </>
  );
}
