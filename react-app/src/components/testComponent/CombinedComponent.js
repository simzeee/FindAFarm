import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../CreateFarm/CreateFarm.module.css'
import { createOneFarm } from '../../store/farms';
import { createOneAmenity } from '../../store/amenities';
import { getAllFarms } from '../../store/farms';
import { getAllAmenities } from '../../store/amenities';
// import SetLocationMap from '../SetLocationMap/SetLocationMap';

import circleFarmer from '../ApiGoogleMap/farmer.png';
// import styles from './SetLocationMap.module.css'


const mapContainerStyle = {
  width: '50vw',
  height: '25vh',
};
const libraries = ['places'];

const defaultCenter = {
  lat: 41.4090,
  lng: -75.6624,
};


let location = {}
console.log("location", location)

function SetLocationMap(){
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  // const [location, setLocation] = useState()

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      // ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    location = { lat: e.latLng.lat(),
      lng: e.latLng.lng()}
      console.log(location)
  }, []);
  // console.log(markers)

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAmBZfHdH2gpZoY_2em_Zfl4DGAq-ZJ38E',
    libraries,
  });


  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14);
  }, [])


  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      <Search panTo={panTo}/>
      <GoogleMap
        zoom={8}
        center={defaultCenter}
        mapContainerStyle={mapContainerStyle}
        onClick={onMapClick}
        //You are given the lat/lng on click
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: circleFarmer,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {/* {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>A farm</h2>
            </div>
          </InfoWindow>
        ) : null} */}
      </GoogleMap>
      <div>location= lat: {markers[0]?.lat} lng: {markers[0]?.lng}</div>
    </>
  );
};


function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className={styles.comboBox}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions()

          try {
            const results = await getGeocode({ address });
            const {lat, lng} = await getLatLng(results[0]);
            panTo({lat, lng})
          } catch (error) {
            console.log('error');
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === 'OK' &&

            data.map(({ id, description }) => (
              <ComboboxOption key={Math.random()} value={description}></ComboboxOption>
            ))}

          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}



export default function Test() {
  const history = useHistory();
  const dispatch = useDispatch();

  const allAmenities = useSelector((state) => state.amenities);

  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);
  const [fifthImage, setFifthImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [alocation, setLocation] = useState(location);
  const [description, setDescription] = useState('');
  const [checkedState, setCheckedState] = useState(false);

  const initialStateSetter = (all) => {
    const stateObject = {};
    all &&
      Object.values(all).forEach((amenity) => {
        stateObject[amenity.amenityName] = false;
      });
    return stateObject;
  };

  const [stateAmenities, setStateAmenities] = useState(
    initialStateSetter(allAmenities)
  );

  const changeSubmit = (someState) => {
    const submitButton = document.querySelector('#farmSubmit');
    if (Object.values(someState).includes(true)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  };

  const updateAmenityState = (e, amenityName, amenityValue) => {
    console.log(e.target.id);

    setStateAmenities((oldState) => {
      console.log(amenityName);
      console.log('VALUE', e.target.id.checked, amenityValue);
      if (e.target.id.checked === false) {
        setCheckedState(true);
      }

      let result = { ...oldState, [amenityName]: e.target.checked };
      changeSubmit(result);
      return result;
    });
  };

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
      stateAmenities
    };
    console.log("PAYLOAD", payload)

    dispatch(createOneFarm(payload))
    

    // history.push('/setLocation');
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

  useEffect(() => {
    dispatch(getAllAmenities());
    dispatch(getAllFarms());
  }, []);

  return (
    <>
      <div className={styles.farmFormContainer}>
        <div className={styles.newFarmForm}>
          <div className={styles.formTitle}>
            <h3>Your New Farm:</h3>
          </div>
          <form className={styles.newFarmActualForm} action="" id="farmForm" onSubmit={(e) => handleSubmit(e)}>
            <label>Farm Name:</label>
            <input
              type="text"
              value={farmName}
              onChange={updateFarmName}
              required={true}
            ></input>
            <label>Price Per Day:</label>
            <input
              type="number"
              value={pricePerDay}
              onChange={updatePricePerDay}
            ></input>
            {/* <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={updateLocation}
              // required={true}
            ></input> */}
            <label>Description:</label>
            <textarea
              form="farmForm"
              value={description}
              onChange={updateDescription}
              required={true}
            ></textarea>
            <label>
          <h4>Available Amenities:</h4>
        </label>
        {Object.values(allAmenities)?.map((amenity) => (
          <div key={amenity.id}>
            <label>{amenity.amenityName}</label>
            <input
              type="checkbox"
              id={amenity.amenityName}
              value={!!stateAmenities[amenity.amenityName]}
              onClick={(e) => updateAmenityState(e, e.target.id, e.target.value)}
            ></input>
          </div>
        ))}
        
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
        <div><SetLocationMap /></div>
      </div>
    </>
  );
}

